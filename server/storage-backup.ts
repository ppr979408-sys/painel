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
  private useTestData = true; // For demo purposes

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
      this.useTestData = false;
    } catch (error) {
      console.error('Database connection failed, using test data:', error.message);
      this.useTestData = true;
    }
  }

  // Test data for demo
  private testClients = [
    {
      codigo_loja: 'LOJA001',
      nome: 'João',
      sobrenome: 'Silva',
      nome_empresa: 'Pizzaria do João',
      email: 'admin@pizzaria.com',
      telefone: '(11) 99999-9999',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      uf: 'SP',
      status: '1'
    },
    {
      codigo_loja: 'LOJA002',
      nome: 'Maria',
      sobrenome: 'Santos',
      nome_empresa: 'Açaí da Maria',
      email: 'maria@acai.com',
      telefone: '(11) 88888-8888',
      endereco: 'Av. Central, 456',
      cidade: 'Rio de Janeiro',
      uf: 'RJ',
      status: '1'
    }
  ];

  private testProducts = [
    { id: 1, titulo: 'Pizza Margherita', preco_venda: '45.90', preco_custo: '18.50', categoria: 'Pizza', codigo_loja: 'LOJA001' },
    { id: 2, titulo: 'Pizza Calabresa', preco_venda: '48.90', preco_custo: '20.00', categoria: 'Pizza', codigo_loja: 'LOJA001' },
    { id: 3, titulo: 'Açaí 500ml', preco_venda: '15.90', preco_custo: '8.50', categoria: 'Açaí', codigo_loja: 'LOJA001' },
    { id: 4, titulo: 'Coca Cola 2L', preco_venda: '8.90', preco_custo: '5.50', categoria: 'Bebidas', codigo_loja: 'LOJA001' },
    { id: 5, titulo: 'X-Burger', preco_venda: '25.90', preco_custo: '12.00', categoria: 'Lanches', codigo_loja: 'LOJA001' },
    { id: 6, titulo: 'Pastel de Carne', preco_venda: '12.50', preco_custo: '6.50', categoria: 'Pastel', codigo_loja: 'LOJA001' },
    { id: 7, titulo: 'Sorvete 1L', preco_venda: '18.90', preco_custo: '9.50', categoria: 'Sorvetes', codigo_loja: 'LOJA001' },
  ];

  private testOrders = [
    { comanda: '001', user_name: 'Ana Costa', IdItem: '1', preco: '45.90', QtdeItem: 2, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '002', user_name: 'Carlos Lima', IdItem: '2', preco: '48.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '003', user_name: 'Fernanda Reis', IdItem: '3', preco: '15.90', QtdeItem: 3, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '004', user_name: 'Roberto Silva', IdItem: '5', preco: '25.90', QtdeItem: 2, status: '2', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '005', user_name: 'Lucia Santos', IdItem: '1', preco: '45.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 172800000).toISOString(), codigo_loja: 'LOJA001' },
  ];

  async authenticateUser(credentials: LoginRequest): Promise<Cliente | null> {
    if (this.useTestData) {
      const client = this.testClients.find(c => c.email === credentials.email);
      return client || null;
    }

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
    if (this.useTestData) {
      const todayOrders = this.testOrders.filter(o => 
        o.codigo_loja === codigoLoja && 
        new Date(o.data_completa).toDateString() === new Date().toDateString()
      );
      
      const completedOrders = todayOrders.filter(o => o.status === '4');
      const todaySales = completedOrders.reduce((sum, order) => 
        sum + (parseFloat(order.preco) * order.QtdeItem), 0
      );
      
      const totalRevenue = completedOrders.reduce((sum, order) => {
        const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
        return sum + (parseFloat(order.preco) * order.QtdeItem);
      }, 0);
      
      const totalCost = completedOrders.reduce((sum, order) => {
        const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
        return sum + (parseFloat(product?.preco_custo || '0') * order.QtdeItem);
      }, 0);
      
      const totalProfit = totalRevenue - totalCost;
      const averageMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
      const avgTicket = completedOrders.length > 0 ? todaySales / completedOrders.length : 0;

      return {
        todaySales: Number(todaySales.toFixed(2)),
        todayOrders: todayOrders.length,
        averageMargin: Number(averageMargin.toFixed(1)),
        averageTicket: Number(avgTicket.toFixed(2)),
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalProfit: Number(totalProfit.toFixed(2))
      };
    }

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
    if (this.useTestData) {
      const days = parseInt(period);
      const salesData: SalesData[] = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayOrders = this.testOrders.filter(o => 
          o.codigo_loja === codigoLoja && 
          o.status === '4' &&
          new Date(o.data_completa).toDateString() === date.toDateString()
        );
        
        const revenue = dayOrders.reduce((sum, order) => 
          sum + (parseFloat(order.preco) * order.QtdeItem), 0
        );
        
        const orders = dayOrders.length;
        const margin = dayOrders.reduce((sum, order) => {
          const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
          if (product) {
            const cost = parseFloat(product.preco_custo);
            const price = parseFloat(order.preco);
            return sum + ((price - cost) / price * 100);
          }
          return sum;
        }, 0) / (orders || 1);
        
        salesData.push({
          date: dateStr,
          revenue: Number(revenue.toFixed(2)),
          orders,
          margin: Number(margin.toFixed(1))
        });
      }
      
      return salesData;
    }

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
    if (this.useTestData) {
      return this.testOrders
        .filter(o => o.codigo_loja === codigoLoja)
        .slice(0, limit)
        .map(order => {
          const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
          const total = parseFloat(order.preco) * order.QtdeItem;
          const cost = parseFloat(product?.preco_custo || '0') * order.QtdeItem;
          const profit = total - cost;
          
          return {
            comanda: order.comanda,
            user_name: order.user_name,
            items: product?.titulo || 'Item não encontrado',
            total: Number(total.toFixed(2)),
            profit: Number(profit.toFixed(2)),
            margin: total > 0 ? ((profit / total) * 100).toFixed(1) : '0',
            status: order.status,
            data: order.data_completa
          };
        });
    }

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
    if (this.useTestData) {
      const productSales = this.testProducts.map(product => {
        const sales = this.testOrders.filter(o => 
          o.IdItem === product.id.toString() && 
          o.codigo_loja === codigoLoja &&
          o.status === '4'
        );
        
        const salesCount = sales.reduce((sum, sale) => sum + sale.QtdeItem, 0);
        const revenue = sales.reduce((sum, sale) => sum + (parseFloat(sale.preco) * sale.QtdeItem), 0);
        const cost = salesCount * parseFloat(product.preco_custo);
        const profit = revenue - cost;
        const margin = revenue > 0 ? ((profit / revenue) * 100) : 0;
        
        return {
          id: product.id,
          titulo: product.titulo,
          categoria: product.categoria,
          salesCount,
          revenue: Number(revenue.toFixed(2)),
          margin: Number(margin.toFixed(1)),
          profit: Number(profit.toFixed(2))
        };
      }).sort((a, b) => b.salesCount - a.salesCount).slice(0, limit);
      
      return productSales;
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

import { TestStorage } from "./test-storage";

export const storage = new TestStorage();
