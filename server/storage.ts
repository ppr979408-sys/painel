import mysql from 'mysql2/promise';
import type { 
  Cliente, 
  Produto, 
  Pedido, 
  LoginRequest, 
  DashboardMetrics, 
  SalesData, 
  ProductPerformance 
} from "@shared/schema";

export interface IStorage {
  authenticateUser(credentials: LoginRequest): Promise<Cliente | null>;
  getDashboardMetrics(codigoLoja: string): Promise<DashboardMetrics>;
  getSalesData(codigoLoja: string, period: string): Promise<SalesData[]>;
  getRecentOrders(codigoLoja: string, limit?: number): Promise<any[]>;
  getTopProducts(codigoLoja: string, limit?: number): Promise<ProductPerformance[]>;
  getLowPerformingProducts(codigoLoja: string, limit?: number): Promise<ProductPerformance[]>;
  getAllProducts(codigoLoja: string): Promise<ProductPerformance[]>;
  getMarginAnalysis(codigoLoja: string): Promise<any>;
  getSalesByCategory(codigoLoja: string): Promise<any[]>;
}

export class MySQLStorage implements IStorage {
  private connection: mysql.Connection | null = null;

  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'menu',
        charset: 'utf8mb4'
      });
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }

  async authenticateUser(credentials: LoginRequest): Promise<Cliente | null> {
    if (!this.connection) await this.connect();
    
    try {
      const [rows] = await this.connection!.execute(
        'SELECT * FROM clientes WHERE email = ? AND status = "1"',
        [credentials.email]
      );

      const clients = rows as any[];
      if (clients.length > 0) {
        // Em um cenário real, verificaríamos a senha hash
        return clients[0] as Cliente;
      }
      return null;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  async getDashboardMetrics(codigoLoja: string): Promise<DashboardMetrics> {
    if (!this.connection) await this.connect();

    try {
      // Sales today
      const [todaySalesResult] = await this.connection!.execute(`
        SELECT COALESCE(SUM(CAST(preco AS DECIMAL(10,2))), 0) as total
        FROM ComandaPedidos 
        WHERE codigo_loja = ? AND DATE(data_completa) = CURDATE() AND status = '4'
      `, [codigoLoja]);

      // Orders today
      const [todayOrdersResult] = await this.connection!.execute(`
        SELECT COUNT(DISTINCT comanda) as total
        FROM ComandaPedidos 
        WHERE codigo_loja = ? AND DATE(data_completa) = CURDATE()
      `, [codigoLoja]);

      // Average ticket
      const [avgTicketResult] = await this.connection!.execute(`
        SELECT AVG(total_pedido) as avg_ticket FROM (
          SELECT comanda, SUM(CAST(preco AS DECIMAL(10,2))) as total_pedido
          FROM ComandaPedidos 
          WHERE codigo_loja = ? AND DATE(data_completa) = CURDATE() AND status = '4'
          GROUP BY comanda
        ) as pedidos
      `, [codigoLoja]);

      // Calculate margins
      const [marginResult] = await this.connection!.execute(`
        SELECT 
          SUM(CAST(cp.preco AS DECIMAL(10,2)) * cp.QtdeItem) as total_revenue,
          SUM(CAST(cf.preco_custo AS DECIMAL(10,2)) * cp.QtdeItem) as total_cost
        FROM ComandaPedidos cp
        JOIN cadastrofeed cf ON cp.IdItem = cf.id
        WHERE cp.codigo_loja = ? AND DATE(cp.data_completa) = CURDATE() AND cp.status = '4'
      `, [codigoLoja]);

      const todaySales = (todaySalesResult as any[])[0]?.total || 0;
      const todayOrders = (todayOrdersResult as any[])[0]?.total || 0;
      const avgTicket = (avgTicketResult as any[])[0]?.avg_ticket || 0;
      const marginData = (marginResult as any[])[0];
      
      const totalRevenue = marginData?.total_revenue || 0;
      const totalCost = marginData?.total_cost || 0;
      const totalProfit = totalRevenue - totalCost;
      const averageMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

      return {
        todaySales: Number(todaySales),
        todayOrders: Number(todayOrders),
        averageMargin: Number(averageMargin.toFixed(1)),
        averageTicket: Number(avgTicket),
        totalRevenue: Number(totalRevenue),
        totalProfit: Number(totalProfit)
      };
    } catch (error) {
      console.error('Error getting dashboard metrics:', error);
      return {
        todaySales: 0,
        todayOrders: 0,
        averageMargin: 0,
        averageTicket: 0,
        totalRevenue: 0,
        totalProfit: 0
      };
    }
  }

  async getSalesData(codigoLoja: string, period: string = '7'): Promise<SalesData[]> {
    if (!this.connection) await this.connect();

    try {
      const [rows] = await this.connection!.execute(`
        SELECT 
          DATE(cp.data_completa) as date,
          COUNT(DISTINCT cp.comanda) as orders,
          SUM(CAST(cp.preco AS DECIMAL(10,2))) as revenue,
          COALESCE(AVG(
            ((CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) / CAST(cp.preco AS DECIMAL(10,2))) * 100
          ), 0) as margin
        FROM ComandaPedidos cp
        LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
        WHERE cp.codigo_loja = ? 
          AND cp.status = '4'
          AND DATE(cp.data_completa) >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        GROUP BY DATE(cp.data_completa)
        ORDER BY DATE(cp.data_completa) ASC
      `, [codigoLoja, period]);

      return (rows as any[]).map(row => ({
        date: row.date,
        revenue: Number(row.revenue || 0),
        orders: Number(row.orders || 0),
        margin: Number((row.margin || 0).toFixed(1))
      }));
    } catch (error) {
      console.error('Error getting sales data:', error);
      return [];
    }
  }

  async getRecentOrders(codigoLoja: string, limit: number = 10): Promise<any[]> {
    if (!this.connection) await this.connect();

    try {
      const [rows] = await this.connection!.execute(`
        SELECT 
          cp.comanda,
          cp.user_name,
          GROUP_CONCAT(cf.titulo) as items,
          SUM(CAST(cp.preco AS DECIMAL(10,2))) as total,
          SUM(CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) as profit,
          cp.status,
          cp.data_completa
        FROM ComandaPedidos cp
        LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
        WHERE cp.codigo_loja = ?
        GROUP BY cp.comanda
        ORDER BY cp.data_completa DESC
        LIMIT ?
      `, [codigoLoja, limit]);

      return (rows as any[]).map(row => ({
        comanda: row.comanda,
        user_name: row.user_name,
        items: row.items,
        total: Number(row.total || 0),
        profit: Number(row.profit || 0),
        margin: row.total > 0 ? ((row.profit / row.total) * 100).toFixed(1) : '0',
        status: row.status,
        data: row.data_completa
      }));
    } catch (error) {
      console.error('Error getting recent orders:', error);
      return [];
    }
  }

  async getTopProducts(codigoLoja: string, limit: number = 5): Promise<ProductPerformance[]> {
    if (!this.connection) await this.connect();

    try {
      const [rows] = await this.connection!.execute(`
        SELECT 
          cf.id,
          cf.titulo,
          cf.categoria,
          COUNT(cp.IdItem) as salesCount,
          SUM(CAST(cp.preco AS DECIMAL(10,2))) as revenue,
          AVG(((CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) / CAST(cp.preco AS DECIMAL(10,2))) * 100) as margin,
          SUM(CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) as profit
        FROM cadastrofeed cf
        JOIN ComandaPedidos cp ON cf.id = cp.IdItem
        WHERE cf.codigo_loja = ? AND cp.status = '4'
        GROUP BY cf.id, cf.titulo, cf.categoria
        ORDER BY salesCount DESC
        LIMIT ?
      `, [codigoLoja, limit]);

      return (rows as any[]).map(row => ({
        id: row.id,
        titulo: row.titulo,
        categoria: row.categoria,
        salesCount: Number(row.salesCount),
        revenue: Number(row.revenue || 0),
        margin: Number((row.margin || 0).toFixed(1)),
        profit: Number(row.profit || 0)
      }));
    } catch (error) {
      console.error('Error getting top products:', error);
      return [];
    }
  }

  async getLowPerformingProducts(codigoLoja: string, limit: number = 5): Promise<ProductPerformance[]> {
    if (!this.connection) await this.connect();

    try {
      const [rows] = await this.connection!.execute(`
        SELECT 
          cf.id,
          cf.titulo,
          cf.categoria,
          COALESCE(COUNT(cp.IdItem), 0) as salesCount,
          COALESCE(SUM(CAST(cp.preco AS DECIMAL(10,2))), 0) as revenue,
          COALESCE(AVG(((CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) / CAST(cp.preco AS DECIMAL(10,2))) * 100), 0) as margin,
          COALESCE(SUM(CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))), 0) as profit
        FROM cadastrofeed cf
        LEFT JOIN ComandaPedidos cp ON cf.id = cp.IdItem AND cp.status = '4'
        WHERE cf.codigo_loja = ?
        GROUP BY cf.id, cf.titulo, cf.categoria
        ORDER BY salesCount ASC
        LIMIT ?
      `, [codigoLoja, limit]);

      return (rows as any[]).map(row => ({
        id: row.id,
        titulo: row.titulo,
        categoria: row.categoria,
        salesCount: Number(row.salesCount),
        revenue: Number(row.revenue || 0),
        margin: Number((row.margin || 0).toFixed(1)),
        profit: Number(row.profit || 0)
      }));
    } catch (error) {
      console.error('Error getting low performing products:', error);
      return [];
    }
  }

  async getAllProducts(codigoLoja: string): Promise<ProductPerformance[]> {
    if (!this.connection) await this.connect();

    try {
      const [rows] = await this.connection!.execute(`
        SELECT 
          cf.id,
          cf.titulo,
          cf.categoria,
          cf.preco_venda,
          cf.preco_custo,
          cf.estoque,
          COALESCE(COUNT(cp.IdItem), 0) as salesCount,
          COALESCE(SUM(CAST(cp.preco AS DECIMAL(10,2))), 0) as revenue,
          COALESCE(AVG(((CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) / CAST(cp.preco AS DECIMAL(10,2))) * 100), 0) as margin,
          COALESCE(SUM(CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))), 0) as profit
        FROM cadastrofeed cf
        LEFT JOIN ComandaPedidos cp ON cf.id = cp.IdItem AND cp.status = '4'
        WHERE cf.codigo_loja = ?
        GROUP BY cf.id, cf.titulo, cf.categoria, cf.preco_venda, cf.preco_custo, cf.estoque
        ORDER BY salesCount DESC
      `, [codigoLoja]);

      return (rows as any[]).map(row => ({
        id: row.id,
        titulo: row.titulo,
        categoria: row.categoria,
        preco_venda: row.preco_venda,
        preco_custo: row.preco_custo,
        estoque: row.estoque,
        salesCount: Number(row.salesCount),
        revenue: Number(row.revenue || 0),
        margin: Number((row.margin || 0).toFixed(1)),
        profit: Number(row.profit || 0)
      }));
    } catch (error) {
      console.error('Error getting all products:', error);
      return [];
    }
  }

  async getMarginAnalysis(codigoLoja: string): Promise<any> {
    if (!this.connection) await this.connect();

    try {
      const [overallMargin] = await this.connection!.execute(`
        SELECT 
          SUM(CAST(cp.preco AS DECIMAL(10,2))) as total_revenue,
          SUM(CAST(cf.preco_custo AS DECIMAL(10,2)) * cp.QtdeItem) as total_cost,
          AVG(((CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) / CAST(cp.preco AS DECIMAL(10,2))) * 100) as avg_margin
        FROM ComandaPedidos cp
        JOIN cadastrofeed cf ON cp.IdItem = cf.id
        WHERE cp.codigo_loja = ? AND cp.status = '4'
      `, [codigoLoja]);

      const [categoryMargins] = await this.connection!.execute(`
        SELECT 
          cf.categoria,
          AVG(((CAST(cp.preco AS DECIMAL(10,2)) - CAST(cf.preco_custo AS DECIMAL(10,2))) / CAST(cp.preco AS DECIMAL(10,2))) * 100) as margin
        FROM ComandaPedidos cp
        JOIN cadastrofeed cf ON cp.IdItem = cf.id
        WHERE cp.codigo_loja = ? AND cp.status = '4'
        GROUP BY cf.categoria
        ORDER BY margin DESC
      `, [codigoLoja]);

      const overall = (overallMargin as any[])[0];
      return {
        overall: {
          totalRevenue: Number(overall?.total_revenue || 0),
          totalCost: Number(overall?.total_cost || 0),
          avgMargin: Number((overall?.avg_margin || 0).toFixed(1))
        },
        byCategory: (categoryMargins as any[]).map(cat => ({
          categoria: cat.categoria,
          margin: Number((cat.margin || 0).toFixed(1))
        }))
      };
    } catch (error) {
      console.error('Error getting margin analysis:', error);
      return { overall: {}, byCategory: [] };
    }
  }

  async getSalesByCategory(codigoLoja: string): Promise<any[]> {
    if (!this.connection) await this.connect();

    try {
      const [rows] = await this.connection!.execute(`
        SELECT 
          cf.categoria,
          COUNT(cp.IdItem) as salesCount,
          SUM(CAST(cp.preco AS DECIMAL(10,2))) as revenue
        FROM ComandaPedidos cp
        JOIN cadastrofeed cf ON cp.IdItem = cf.id
        WHERE cp.codigo_loja = ? AND cp.status = '4'
        GROUP BY cf.categoria
        ORDER BY revenue DESC
      `, [codigoLoja]);

      return (rows as any[]).map(row => ({
        categoria: row.categoria,
        salesCount: Number(row.salesCount),
        revenue: Number(row.revenue || 0)
      }));
    } catch (error) {
      console.error('Error getting sales by category:', error);
      return [];
    }
  }
}

export const storage = new MySQLStorage();
