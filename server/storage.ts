import type { 
  Cliente, 
  LoginRequest, 
  DashboardMetrics, 
  SalesData, 
  ProductPerformance 
} from "@shared/schema";
import mysql from 'mysql2/promise';

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
  getDetailedOrdersWithProfit(codigoLoja: string): Promise<any[]>;
}

export class TestStorage implements IStorage {
  // Dados baseados no schema real do banco MySQL fornecido
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
      sobrenome: 'Costa',
      nome_empresa: 'Açaí da Maria',
      email: 'maria@acai.com',
      telefone: '(11) 88888-8888',
      endereco: 'Av. Paulista, 500',
      cidade: 'São Paulo',
      uf: 'SP',
      status: '1'
    }
  ];

  // Produtos baseados nas categorias reais do banco (tabela cadastrofeed)
  private testProducts = [
    // Pizza
    { id: 1, titulo: 'Pizza Margherita', preco_venda: '45.90', preco_custo: '18.50', categoria: 'Pizza', codigo_loja: 'LOJA001', estoque: '50' },
    { id: 2, titulo: 'Pizza Calabresa', preco_venda: '48.90', preco_custo: '20.00', categoria: 'Pizza', codigo_loja: 'LOJA001', estoque: '45' },
    { id: 3, titulo: 'Pizza Portuguesa', preco_venda: '52.90', preco_custo: '22.50', categoria: 'Pizza', codigo_loja: 'LOJA001', estoque: '40' },
    
    // Açaí (categoria real do banco)
    { id: 4, titulo: 'Açaí 300ml', preco_venda: '12.90', preco_custo: '7.50', categoria: 'Açai', codigo_loja: 'LOJA001', estoque: '150' },
    { id: 5, titulo: 'Açaí 500ml', preco_venda: '18.90', preco_custo: '11.00', categoria: 'Açai', codigo_loja: 'LOJA001', estoque: '120' },
    { id: 6, titulo: 'Açaí 700ml', preco_venda: '24.90', preco_custo: '14.50', categoria: 'Açai', codigo_loja: 'LOJA001', estoque: '80' },
    
    // Bebidas
    { id: 7, titulo: 'Coca Cola 2L', preco_venda: '8.90', preco_custo: '5.50', categoria: 'Bebidas', codigo_loja: 'LOJA001', estoque: '200' },
    { id: 8, titulo: 'Suco Natural Laranja', preco_venda: '6.90', preco_custo: '3.50', categoria: 'Bebidas', codigo_loja: 'LOJA001', estoque: '100' },
    { id: 9, titulo: 'Água Mineral 500ml', preco_venda: '3.50', preco_custo: '1.80', categoria: 'Bebidas', codigo_loja: 'LOJA001', estoque: '300' },
    
    // Lanches
    { id: 10, titulo: 'X-Burger', preco_venda: '25.90', preco_custo: '12.00', categoria: 'Lanches', codigo_loja: 'LOJA001', estoque: '30' },
    { id: 11, titulo: 'X-Salada', preco_venda: '28.90', preco_custo: '14.50', categoria: 'Lanches', codigo_loja: 'LOJA001', estoque: '25' },
    { id: 12, titulo: 'X-Bacon', preco_venda: '32.90', preco_custo: '18.00', categoria: 'Lanches', codigo_loja: 'LOJA001', estoque: '20' },
    
    // Hotdog (categoria real)
    { id: 13, titulo: 'Hotdog Tradicional', preco_venda: '15.90', preco_custo: '8.50', categoria: 'Hotdog', codigo_loja: 'LOJA001', estoque: '60' },
    { id: 14, titulo: 'Hotdog Especial', preco_venda: '19.90', preco_custo: '11.00', categoria: 'Hotdog', codigo_loja: 'LOJA001', estoque: '40' },
    
    // Pastel (categoria real)
    { id: 15, titulo: 'Pastel de Carne', preco_venda: '8.90', preco_custo: '4.50', categoria: 'Pastel', codigo_loja: 'LOJA001', estoque: '80' },
    { id: 16, titulo: 'Pastel de Queijo', preco_venda: '7.90', preco_custo: '3.80', categoria: 'Pastel', codigo_loja: 'LOJA001', estoque: '90' },
    
    // Sorvetes (categoria real)
    { id: 17, titulo: 'Sorvete Casquinha', preco_venda: '5.90', preco_custo: '2.50', categoria: 'Sorvetes', codigo_loja: 'LOJA001', estoque: '100' },
    { id: 18, titulo: 'Milkshake Chocolate', preco_venda: '12.90', preco_custo: '7.00', categoria: 'Sorvetes', codigo_loja: 'LOJA001', estoque: '50' },
    
    // Doces (categoria real)
    { id: 19, titulo: 'Brigadeiro', preco_venda: '3.50', preco_custo: '1.50', categoria: 'Doces', codigo_loja: 'LOJA001', estoque: '200' },
    { id: 20, titulo: 'Beijinho', preco_venda: '3.50', preco_custo: '1.50', categoria: 'Doces', codigo_loja: 'LOJA001', estoque: '180' }
  ];

  // Pedidos simulados baseados na estrutura real da tabela ComandaPedidos
  private testOrders = [
    // Pedidos de hoje
    { comanda: '001', user_name: 'Ana Costa', IdItem: '1', preco: '45.90', QtdeItem: 2, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '002', user_name: 'Carlos Lima', IdItem: '4', preco: '12.90', QtdeItem: 3, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '003', user_name: 'Fernanda Reis', IdItem: '10', preco: '25.90', QtdeItem: 1, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '004', user_name: 'Roberto Silva', IdItem: '7', preco: '8.90', QtdeItem: 2, status: '2', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '005', user_name: 'Lucia Santos', IdItem: '13', preco: '15.90', QtdeItem: 1, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '006', user_name: 'Pedro Oliveira', IdItem: '19', preco: '3.50', QtdeItem: 5, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    
    // Pedidos de ontem
    { comanda: '007', user_name: 'Maria Silva', IdItem: '2', preco: '48.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '008', user_name: 'João Santos', IdItem: '5', preco: '18.90', QtdeItem: 2, status: '4', data_completa: new Date(Date.now() - 86400000).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '009', user_name: 'Patricia Costa', IdItem: '11', preco: '28.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '010', user_name: 'Ricardo Alves', IdItem: '15', preco: '8.90', QtdeItem: 3, status: '4', data_completa: new Date(Date.now() - 86400000).toISOString(), codigo_loja: 'LOJA001' },
    
    // Pedidos da semana passada
    { comanda: '011', user_name: 'Cristina Mendes', IdItem: '3', preco: '52.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000 * 3).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '012', user_name: 'André Rocha', IdItem: '6', preco: '24.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000 * 3).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '013', user_name: 'Beatriz Lima', IdItem: '12', preco: '32.90', QtdeItem: 2, status: '4', data_completa: new Date(Date.now() - 86400000 * 4).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '014', user_name: 'Gabriel Silva', IdItem: '14', preco: '19.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000 * 5).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '015', user_name: 'Camila Santos', IdItem: '18', preco: '12.90', QtdeItem: 2, status: '4', data_completa: new Date(Date.now() - 86400000 * 6).toISOString(), codigo_loja: 'LOJA001' },
    
    // Pedidos em andamento
    { comanda: '016', user_name: 'Felipe Costa', IdItem: '1', preco: '45.90', QtdeItem: 1, status: '2', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '017', user_name: 'Tatiana Rocha', IdItem: '8', preco: '6.90', QtdeItem: 2, status: '3', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
  ];

  async authenticateUser(credentials: LoginRequest): Promise<Cliente | null> {
    const client = this.testClients.find(c => c.email === credentials.email);
    return client || null;
  }

  async getDashboardMetrics(codigoLoja: string): Promise<DashboardMetrics> {
    const todayOrders = this.testOrders.filter(o => 
      o.codigo_loja === codigoLoja && 
      new Date(o.data_completa).toDateString() === new Date().toDateString()
    );
    
    const completedOrders = todayOrders.filter(o => o.status === '4');
    const todaySales = completedOrders.reduce((sum, order) => 
      sum + (parseFloat(order.preco) * order.QtdeItem), 0
    );
    
    const totalRevenue = completedOrders.reduce((sum, order) => {
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

  async getSalesData(codigoLoja: string, period: string = '7'): Promise<SalesData[]> {
    const days = parseInt(period);
    const salesData: SalesData[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      salesData.push({
        date: dateStr,
        revenue: Number((150 + Math.random() * 200).toFixed(2)),
        orders: Math.floor(8 + Math.random() * 15),
        margin: Number((55 + Math.random() * 20).toFixed(1))
      });
    }
    
    return salesData;
  }

  async getRecentOrders(codigoLoja: string, limit: number = 10): Promise<any[]> {
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

  async getTopProducts(codigoLoja: string, limit: number = 5): Promise<ProductPerformance[]> {
    return this.testProducts.slice(0, limit).map((product, index) => ({
      id: product.id,
      titulo: product.titulo,
      categoria: product.categoria,
      salesCount: 25 - (index * 3),
      revenue: Number((500 - (index * 80)).toFixed(2)),
      margin: Number((65 - (index * 5)).toFixed(1)),
      profit: Number((200 - (index * 30)).toFixed(2))
    }));
  }

  async getLowPerformingProducts(codigoLoja: string, limit: number = 5): Promise<ProductPerformance[]> {
    return this.testProducts.slice(-limit).map((product, index) => ({
      id: product.id,
      titulo: product.titulo,
      categoria: product.categoria,
      salesCount: index + 1,
      revenue: Number((50 + (index * 20)).toFixed(2)),
      margin: Number((30 + (index * 5)).toFixed(1)),
      profit: Number((15 + (index * 8)).toFixed(2))
    }));
  }

  async getAllProducts(codigoLoja: string): Promise<ProductPerformance[]> {
    return this.testProducts.map((product, index) => ({
      id: product.id,
      titulo: product.titulo,
      categoria: product.categoria,
      preco_venda: product.preco_venda,
      preco_custo: product.preco_custo,
      estoque: product.estoque,
      salesCount: 20 - (index * 2),
      revenue: Number((400 - (index * 60)).toFixed(2)),
      margin: Number((60 - (index * 3)).toFixed(1)),
      profit: Number((180 - (index * 25)).toFixed(2))
    }));
  }

  async getMarginAnalysis(codigoLoja: string): Promise<any> {
    let totalRevenue = 0;
    let totalCost = 0;
    const categoryData: Record<string, { revenue: number, cost: number }> = {};
    
    // Calcular margens baseado nos dados reais
    for (const order of this.testOrders) {
      if (order.codigo_loja === codigoLoja && order.status === '4') {
        const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
        if (product) {
          const revenue = parseFloat(order.preco) * order.QtdeItem;
          const cost = parseFloat(product.preco_custo) * order.QtdeItem;
          
          totalRevenue += revenue;
          totalCost += cost;
          
          const categoria = product.categoria;
          if (!categoryData[categoria]) {
            categoryData[categoria] = { revenue: 0, cost: 0 };
          }
          
          categoryData[categoria].revenue += revenue;
          categoryData[categoria].cost += cost;
        }
      }
    }
    
    const avgMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;
    
    const byCategory = Object.entries(categoryData).map(([categoria, data]) => ({
      categoria,
      margin: data.revenue > 0 ? Number(((data.revenue - data.cost) / data.revenue * 100).toFixed(1)) : 0
    })).sort((a, b) => b.margin - a.margin);
    
    return {
      overall: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
        avgMargin: Number(avgMargin.toFixed(1))
      },
      byCategory
    };
  }

  async getSalesByCategory(codigoLoja: string): Promise<any[]> {
    const categorySales: Record<string, { count: number, revenue: number }> = {};
    
    // Calcular vendas por categoria baseado nos pedidos simulados
    for (const order of this.testOrders) {
      if (order.codigo_loja === codigoLoja && order.status === '4') {
        const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
        if (product) {
          const categoria = product.categoria;
          const revenue = parseFloat(order.preco) * order.QtdeItem;
          
          if (!categorySales[categoria]) {
            categorySales[categoria] = { count: 0, revenue: 0 };
          }
          
          categorySales[categoria].count += 1;
          categorySales[categoria].revenue += revenue;
        }
      }
    }
    
    // Converter para o formato esperado
    return Object.entries(categorySales).map(([categoria, data]) => ({
      categoria,
      salesCount: data.count,
      revenue: Number(data.revenue.toFixed(2))
    })).sort((a, b) => b.revenue - a.revenue);
  }

  async getDetailedOrdersWithProfit(codigoLoja: string): Promise<any[]> {
    const orders = this.testOrders.filter(o => o.codigo_loja === codigoLoja);
    
    return orders.map(order => {
      const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
      const revenue = parseFloat(order.preco) * order.QtdeItem;
      let cost = 0;
      let profit = 0;
      let margin = 0;
      let productName = 'Produto Desconhecido';
      let category = 'N/A';
      
      if (product) {
        cost = parseFloat(product.preco_custo) * order.QtdeItem;
        profit = revenue - cost;
        margin = revenue > 0 ? (profit / revenue) * 100 : 0;
        productName = product.titulo;
        category = product.categoria;
      }
      
      return {
        comanda: order.comanda,
        user_name: order.user_name,
        product_name: productName,
        categoria: category,
        preco_unitario: parseFloat(order.preco),
        quantidade: order.QtdeItem,
        receita: revenue,
        custo: cost,
        lucro: profit,
        margem: margin,
        status: order.status,
        data_completa: order.data_completa,
        data_formatada: new Date(order.data_completa).toLocaleDateString('pt-BR')
      };
    }).sort((a, b) => new Date(b.data_completa).getTime() - new Date(a.data_completa).getTime());
  }
}

// MySQL Storage - Real database implementation
export class MySQLStorage implements IStorage {
  private connection: mysql.Connection | null = null;

  private async getConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || 'menu',
        port: parseInt(process.env.MYSQL_PORT || '3306')
      });
    }
    return this.connection;
  }

  async authenticateUser(credentials: LoginRequest): Promise<Cliente | null> {
    const connection = await this.getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM clientes WHERE email = ? AND status = "1" LIMIT 1',
      [credentials.email]
    );
    
    const clients = rows as any[];
    return clients.length > 0 ? clients[0] : null;
  }

  async getDashboardMetrics(codigoLoja: string): Promise<DashboardMetrics> {
    const connection = await this.getConnection();
    
    // Buscar pedidos de hoje
    const [todayOrdersResult] = await connection.execute(`
      SELECT COUNT(*) as total_orders, 
             COALESCE(SUM(preco * QtdeItem), 0) as total_sales
      FROM ComandaPedidos 
      WHERE codigo_loja = ? 
      AND DATE(data_completa) = CURDATE() 
      AND status = '4'
    `, [codigoLoja]);
    
    const todayData = (todayOrdersResult as any[])[0];
    
    // Buscar dados de margem e lucro
    const [profitResult] = await connection.execute(`
      SELECT 
        COALESCE(SUM(cp.preco * cp.QtdeItem), 0) as total_revenue,
        COALESCE(SUM(cf.preco_custo * cp.QtdeItem), 0) as total_cost
      FROM ComandaPedidos cp
      LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
      WHERE cp.codigo_loja = ? 
      AND cp.status = '4'
      AND DATE(cp.data_completa) = CURDATE()
    `, [codigoLoja]);
    
    const profitData = (profitResult as any[])[0];
    const totalRevenue = parseFloat(profitData?.total_revenue || '0');
    const totalCost = parseFloat(profitData?.total_cost || '0');
    const totalProfit = totalRevenue - totalCost;
    const averageMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
    const averageTicket = todayData.total_orders > 0 ? parseFloat(todayData.total_sales) / todayData.total_orders : 0;

    return {
      todaySales: parseFloat(todayData.total_sales || '0'),
      todayOrders: parseInt(todayData.total_orders || '0'),
      averageMargin: Number(averageMargin.toFixed(1)),
      averageTicket: Number(averageTicket.toFixed(2)),
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalProfit: Number(totalProfit.toFixed(2))
    };
  }

  async getSalesData(codigoLoja: string, period: string = '7'): Promise<SalesData[]> {
    const connection = await this.getConnection();
    const days = parseInt(period);
    
    const [rows] = await connection.execute(`
      SELECT 
        DATE(data_completa) as date,
        COALESCE(SUM(preco * QtdeItem), 0) as revenue,
        COUNT(*) as orders
      FROM ComandaPedidos 
      WHERE codigo_loja = ? 
      AND status = '4'
      AND DATE(data_completa) >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY DATE(data_completa)
      ORDER BY DATE(data_completa)
    `, [codigoLoja, days]);
    
    const salesData = (rows as any[]).map(row => ({
      date: row.date,
      revenue: Number(parseFloat(row.revenue).toFixed(2)),
      orders: parseInt(row.orders),
      margin: Number((55 + Math.random() * 20).toFixed(1)) // Placeholder para margem
    }));
    
    return salesData;
  }

  async getRecentOrders(codigoLoja: string, limit: number = 10): Promise<any[]> {
    const connection = await this.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        cp.comanda,
        cp.user_name,
        cf.titulo as product_title,
        cp.preco,
        cp.QtdeItem,
        cp.status,
        cp.data_completa,
        cf.preco_custo
      FROM ComandaPedidos cp
      LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
      WHERE cp.codigo_loja = ?
      ORDER BY cp.data_completa DESC
      LIMIT ?
    `, [codigoLoja, limit]);
    
    return (rows as any[]).map(order => {
      const total = parseFloat(order.preco) * parseInt(order.QtdeItem);
      const cost = parseFloat(order.preco_custo || '0') * parseInt(order.QtdeItem);
      const profit = total - cost;
      
      return {
        comanda: order.comanda,
        user_name: order.user_name,
        items: order.product_title || 'Item não encontrado',
        total: Number(total.toFixed(2)),
        profit: Number(profit.toFixed(2)),
        margin: total > 0 ? ((profit / total) * 100).toFixed(1) : '0',
        status: order.status,
        data: order.data_completa
      };
    });
  }

  async getTopProducts(codigoLoja: string, limit: number = 5): Promise<ProductPerformance[]> {
    const connection = await this.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        cf.id,
        cf.titulo,
        cf.categoria,
        COUNT(cp.IdItem) as sales_count,
        SUM(cp.preco * cp.QtdeItem) as revenue,
        AVG(cf.preco_venda) as avg_price,
        AVG(cf.preco_custo) as avg_cost
      FROM cadastrofeed cf
      LEFT JOIN ComandaPedidos cp ON cf.id = cp.IdItem AND cp.status = '4'
      WHERE cf.codigo_loja = ?
      GROUP BY cf.id, cf.titulo, cf.categoria
      ORDER BY sales_count DESC, revenue DESC
      LIMIT ?
    `, [codigoLoja, limit]);
    
    return (rows as any[]).map(product => {
      const revenue = parseFloat(product.revenue || '0');
      const cost = parseFloat(product.avg_cost || '0') * parseInt(product.sales_count || '0');
      const profit = revenue - cost;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      
      return {
        id: parseInt(product.id),
        titulo: product.titulo,
        categoria: product.categoria,
        salesCount: parseInt(product.sales_count || '0'),
        revenue: Number(revenue.toFixed(2)),
        margin: Number(margin.toFixed(1)),
        profit: Number(profit.toFixed(2))
      };
    });
  }

  async getLowPerformingProducts(codigoLoja: string, limit: number = 5): Promise<ProductPerformance[]> {
    const connection = await this.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        cf.id,
        cf.titulo,
        cf.categoria,
        COALESCE(COUNT(cp.IdItem), 0) as sales_count,
        COALESCE(SUM(cp.preco * cp.QtdeItem), 0) as revenue,
        cf.preco_venda,
        cf.preco_custo
      FROM cadastrofeed cf
      LEFT JOIN ComandaPedidos cp ON cf.id = cp.IdItem AND cp.status = '4'
      WHERE cf.codigo_loja = ?
      GROUP BY cf.id, cf.titulo, cf.categoria, cf.preco_venda, cf.preco_custo
      ORDER BY sales_count ASC, revenue ASC
      LIMIT ?
    `, [codigoLoja, limit]);
    
    return (rows as any[]).map(product => {
      const revenue = parseFloat(product.revenue || '0');
      const cost = parseFloat(product.preco_custo || '0') * parseInt(product.sales_count || '0');
      const profit = revenue - cost;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      
      return {
        id: parseInt(product.id),
        titulo: product.titulo,
        categoria: product.categoria,
        salesCount: parseInt(product.sales_count || '0'),
        revenue: Number(revenue.toFixed(2)),
        margin: Number(margin.toFixed(1)),
        profit: Number(profit.toFixed(2))
      };
    });
  }

  async getAllProducts(codigoLoja: string): Promise<ProductPerformance[]> {
    const connection = await this.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        cf.id,
        cf.titulo,
        cf.categoria,
        cf.preco_venda,
        cf.preco_custo,
        cf.estoque,
        COALESCE(COUNT(cp.IdItem), 0) as sales_count,
        COALESCE(SUM(cp.preco * cp.QtdeItem), 0) as revenue
      FROM cadastrofeed cf
      LEFT JOIN ComandaPedidos cp ON cf.id = cp.IdItem AND cp.status = '4'
      WHERE cf.codigo_loja = ?
      GROUP BY cf.id, cf.titulo, cf.categoria, cf.preco_venda, cf.preco_custo, cf.estoque
      ORDER BY cf.titulo
    `, [codigoLoja]);
    
    return (rows as any[]).map(product => {
      const revenue = parseFloat(product.revenue || '0');
      const salesCount = parseInt(product.sales_count || '0');
      const unitCost = parseFloat(product.preco_custo || '0');
      const totalCost = unitCost * salesCount;
      const profit = revenue - totalCost;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      
      return {
        id: parseInt(product.id),
        titulo: product.titulo,
        categoria: product.categoria,
        preco_venda: product.preco_venda,
        preco_custo: product.preco_custo,
        estoque: product.estoque,
        salesCount: salesCount,
        revenue: Number(revenue.toFixed(2)),
        margin: Number(margin.toFixed(1)),
        profit: Number(profit.toFixed(2))
      };
    });
  }

  async getMarginAnalysis(codigoLoja: string): Promise<any> {
    const connection = await this.getConnection();
    
    // Análise geral
    const [overallResult] = await connection.execute(`
      SELECT 
        COALESCE(SUM(cp.preco * cp.QtdeItem), 0) as total_revenue,
        COALESCE(SUM(cf.preco_custo * cp.QtdeItem), 0) as total_cost
      FROM ComandaPedidos cp
      LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
      WHERE cp.codigo_loja = ? AND cp.status = '4'
    `, [codigoLoja]);
    
    const overallData = (overallResult as any[])[0];
    const totalRevenue = parseFloat(overallData.total_revenue || '0');
    const totalCost = parseFloat(overallData.total_cost || '0');
    const avgMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;
    
    // Análise por categoria
    const [categoryResult] = await connection.execute(`
      SELECT 
        cf.categoria,
        COALESCE(SUM(cp.preco * cp.QtdeItem), 0) as revenue,
        COALESCE(SUM(cf.preco_custo * cp.QtdeItem), 0) as cost
      FROM ComandaPedidos cp
      LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
      WHERE cp.codigo_loja = ? AND cp.status = '4'
      GROUP BY cf.categoria
      HAVING revenue > 0
    `, [codigoLoja]);
    
    const byCategory = (categoryResult as any[]).map(category => {
      const revenue = parseFloat(category.revenue);
      const cost = parseFloat(category.cost);
      const margin = revenue > 0 ? ((revenue - cost) / revenue) * 100 : 0;
      
      return {
        categoria: category.categoria,
        margin: Number(margin.toFixed(1))
      };
    });
    
    return {
      overall: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
        avgMargin: Number(avgMargin.toFixed(1))
      },
      byCategory
    };
  }

  async getSalesByCategory(codigoLoja: string): Promise<any[]> {
    const connection = await this.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        cf.categoria,
        COUNT(cp.IdItem) as sales_count,
        SUM(cp.preco * cp.QtdeItem) as revenue
      FROM ComandaPedidos cp
      LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
      WHERE cp.codigo_loja = ? AND cp.status = '4'
      GROUP BY cf.categoria
      HAVING revenue > 0
      ORDER BY revenue DESC
    `, [codigoLoja]);
    
    return (rows as any[]).map(category => ({
      categoria: category.categoria,
      salesCount: parseInt(category.sales_count),
      revenue: Number(parseFloat(category.revenue).toFixed(2))
    }));
  }

  async getDetailedOrdersWithProfit(codigoLoja: string): Promise<any[]> {
    const connection = await this.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        cp.comanda,
        cp.user_name,
        cf.titulo as product_name,
        cf.categoria,
        cp.preco as preco_unitario,
        cp.QtdeItem as quantidade,
        (cp.preco * cp.QtdeItem) as receita,
        (cf.preco_custo * cp.QtdeItem) as custo,
        cp.status,
        cp.data_completa
      FROM ComandaPedidos cp
      LEFT JOIN cadastrofeed cf ON cp.IdItem = cf.id
      WHERE cp.codigo_loja = ?
      ORDER BY cp.data_completa DESC
    `, [codigoLoja]);
    
    return (rows as any[]).map(order => {
      const receita = parseFloat(order.receita || '0');
      const custo = parseFloat(order.custo || '0');
      const lucro = receita - custo;
      const margem = receita > 0 ? (lucro / receita) * 100 : 0;
      
      return {
        comanda: order.comanda,
        user_name: order.user_name,
        product_name: order.product_name || 'Produto Desconhecido',
        categoria: order.categoria || 'N/A',
        preco_unitario: parseFloat(order.preco_unitario || '0'),
        quantidade: parseInt(order.quantidade || '0'),
        receita: receita,
        custo: custo,
        lucro: lucro,
        margem: margem,
        status: order.status === '4' ? 'Concluído' : order.status === '2' ? 'Em andamento' : 'Outros',
        data_completa: order.data_completa,
        data_formatada: new Date(order.data_completa).toLocaleDateString('pt-BR')
      };
    });
  }
}

// Use MySQL storage if configured, otherwise use TestStorage
export const storage = process.env.USE_MYSQL === 'true' 
  ? new MySQLStorage() 
  : new TestStorage();