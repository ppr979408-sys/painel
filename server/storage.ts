import type { 
  Cliente, 
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
  getDetailedOrdersWithProfit(codigoLoja: string): Promise<any[]>;
}

export class TestStorage implements IStorage {
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
    }
  ];

  private testProducts = [
    { id: 1, titulo: 'Pizza Margherita', preco_venda: '45.90', preco_custo: '18.50', categoria: 'Pizza', codigo_loja: 'LOJA001', estoque: '50' },
    { id: 2, titulo: 'Pizza Calabresa', preco_venda: '48.90', preco_custo: '20.00', categoria: 'Pizza', codigo_loja: 'LOJA001', estoque: '45' },
    { id: 3, titulo: 'Açaí 500ml', preco_venda: '15.90', preco_custo: '8.50', categoria: 'Açaí', codigo_loja: 'LOJA001', estoque: '100' },
    { id: 4, titulo: 'Coca Cola 2L', preco_venda: '8.90', preco_custo: '5.50', categoria: 'Bebidas', codigo_loja: 'LOJA001', estoque: '200' },
    { id: 5, titulo: 'X-Burger', preco_venda: '25.90', preco_custo: '12.00', categoria: 'Lanches', codigo_loja: 'LOJA001', estoque: '30' }
  ];

  private testOrders = [
    { comanda: '001', user_name: 'Ana Costa', IdItem: '1', preco: '45.90', QtdeItem: 2, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '002', user_name: 'Carlos Lima', IdItem: '2', preco: '48.90', QtdeItem: 1, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '003', user_name: 'Fernanda Reis', IdItem: '3', preco: '15.90', QtdeItem: 3, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '004', user_name: 'Roberto Silva', IdItem: '5', preco: '25.90', QtdeItem: 2, status: '2', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '005', user_name: 'Lucia Santos', IdItem: '1', preco: '45.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000).toISOString(), codigo_loja: 'LOJA001' }
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
    return {
      overall: {
        totalRevenue: 2450.80,
        totalCost: 1120.50,
        avgMargin: 54.3
      },
      byCategory: [
        { categoria: 'Pizza', margin: 62.1 },
        { categoria: 'Lanches', margin: 53.7 },
        { categoria: 'Açaí', margin: 46.5 },
        { categoria: 'Bebidas', margin: 38.2 }
      ]
    };
  }

  async getSalesByCategory(codigoLoja: string): Promise<any[]> {
    return [
      { categoria: 'Pizza', salesCount: 45, revenue: 1250.80 },
      { categoria: 'Lanches', salesCount: 32, revenue: 890.45 },
      { categoria: 'Açaí', salesCount: 28, revenue: 445.20 },
      { categoria: 'Bebidas', salesCount: 67, revenue: 596.30 }
    ];
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

export const storage = new TestStorage();