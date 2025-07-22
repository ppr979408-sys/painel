import type { 
  Cliente, 
  LoginRequest, 
  DashboardMetrics, 
  SalesData, 
  ProductPerformance 
} from "@shared/schema";
import { IStorage } from "./storage";

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
    { id: 1, titulo: 'Pizza Margherita', preco_venda: '45.90', preco_custo: '18.50', categoria: 'Pizza', codigo_loja: 'LOJA001', estoque: '50' },
    { id: 2, titulo: 'Pizza Calabresa', preco_venda: '48.90', preco_custo: '20.00', categoria: 'Pizza', codigo_loja: 'LOJA001', estoque: '45' },
    { id: 3, titulo: 'Açaí 500ml', preco_venda: '15.90', preco_custo: '8.50', categoria: 'Açaí', codigo_loja: 'LOJA001', estoque: '100' },
    { id: 4, titulo: 'Coca Cola 2L', preco_venda: '8.90', preco_custo: '5.50', categoria: 'Bebidas', codigo_loja: 'LOJA001', estoque: '200' },
    { id: 5, titulo: 'X-Burger', preco_venda: '25.90', preco_custo: '12.00', categoria: 'Lanches', codigo_loja: 'LOJA001', estoque: '30' },
    { id: 6, titulo: 'Pastel de Carne', preco_venda: '12.50', preco_custo: '6.50', categoria: 'Pastel', codigo_loja: 'LOJA001', estoque: '80' },
    { id: 7, titulo: 'Sorvete 1L', preco_venda: '18.90', preco_custo: '9.50', categoria: 'Sorvetes', codigo_loja: 'LOJA001', estoque: '25' },
  ];

  private testOrders = [
    { comanda: '001', user_name: 'Ana Costa', IdItem: '1', preco: '45.90', QtdeItem: 2, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '002', user_name: 'Carlos Lima', IdItem: '2', preco: '48.90', QtdeItem: 1, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '003', user_name: 'Fernanda Reis', IdItem: '3', preco: '15.90', QtdeItem: 3, status: '4', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '004', user_name: 'Roberto Silva', IdItem: '5', preco: '25.90', QtdeItem: 2, status: '2', data_completa: new Date().toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '005', user_name: 'Lucia Santos', IdItem: '1', preco: '45.90', QtdeItem: 1, status: '4', data_completa: new Date(Date.now() - 86400000).toISOString(), codigo_loja: 'LOJA001' },
    { comanda: '006', user_name: 'Pedro Oliveira', IdItem: '4', preco: '8.90', QtdeItem: 4, status: '4', data_completa: new Date(Date.now() - 172800000).toISOString(), codigo_loja: 'LOJA001' },
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
        revenue: Number((revenue + Math.random() * 100).toFixed(2)), // Add some variation
        orders: orders + Math.floor(Math.random() * 3),
        margin: Number(margin.toFixed(1))
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

  async getLowPerformingProducts(codigoLoja: string, limit: number = 5): Promise<ProductPerformance[]> {
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
    }).sort((a, b) => a.salesCount - b.salesCount).slice(0, limit);
    
    return productSales;
  }

  async getAllProducts(codigoLoja: string): Promise<ProductPerformance[]> {
    return this.testProducts.map(product => {
      const sales = this.testOrders.filter(o => 
        o.IdItem === product.id.toString() && 
        o.codigo_loja === codigoLoja &&
        o.status === '4'
      );
      
      const salesCount = sales.reduce((sum, sale) => sum + sale.QtdeItem, 0);
      const revenue = sales.reduce((sum, sale) => sum + (parseFloat(sale.preco) * sale.QtdeItem), 0);
      const cost = salesCount * parseFloat(product.preco_custo);
      const profit = revenue - cost;
      const margin = parseFloat(product.preco_venda) > 0 ? 
        ((parseFloat(product.preco_venda) - parseFloat(product.preco_custo)) / parseFloat(product.preco_venda) * 100) : 0;
      
      return {
        id: product.id,
        titulo: product.titulo,
        categoria: product.categoria,
        preco_venda: product.preco_venda,
        preco_custo: product.preco_custo,
        estoque: product.estoque,
        salesCount,
        revenue: Number(revenue.toFixed(2)),
        margin: Number(margin.toFixed(1)),
        profit: Number(profit.toFixed(2))
      };
    });
  }

  async getMarginAnalysis(codigoLoja: string): Promise<any> {
    const completedOrders = this.testOrders.filter(o => o.codigo_loja === codigoLoja && o.status === '4');
    
    let totalRevenue = 0;
    let totalCost = 0;
    
    const categoryMargins: Record<string, { revenue: number, cost: number }> = {};
    
    completedOrders.forEach(order => {
      const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
      if (product) {
        const orderRevenue = parseFloat(order.preco) * order.QtdeItem;
        const orderCost = parseFloat(product.preco_custo) * order.QtdeItem;
        
        totalRevenue += orderRevenue;
        totalCost += orderCost;
        
        if (!categoryMargins[product.categoria]) {
          categoryMargins[product.categoria] = { revenue: 0, cost: 0 };
        }
        categoryMargins[product.categoria].revenue += orderRevenue;
        categoryMargins[product.categoria].cost += orderCost;
      }
    });
    
    const avgMargin = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue * 100) : 0;
    
    const byCategory = Object.entries(categoryMargins).map(([categoria, data]) => ({
      categoria,
      margin: data.revenue > 0 ? ((data.revenue - data.cost) / data.revenue * 100) : 0
    }));
    
    return {
      overall: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
        avgMargin: Number(avgMargin.toFixed(1))
      },
      byCategory: byCategory.map(cat => ({
        categoria: cat.categoria,
        margin: Number(cat.margin.toFixed(1))
      }))
    };
  }

  async getSalesByCategory(codigoLoja: string): Promise<any[]> {
    const completedOrders = this.testOrders.filter(o => o.codigo_loja === codigoLoja && o.status === '4');
    const categorySales: Record<string, { count: number, revenue: number }> = {};
    
    completedOrders.forEach(order => {
      const product = this.testProducts.find(p => p.id.toString() === order.IdItem);
      if (product) {
        if (!categorySales[product.categoria]) {
          categorySales[product.categoria] = { count: 0, revenue: 0 };
        }
        categorySales[product.categoria].count += order.QtdeItem;
        categorySales[product.categoria].revenue += parseFloat(order.preco) * order.QtdeItem;
      }
    });
    
    return Object.entries(categorySales).map(([categoria, data]) => ({
      categoria,
      salesCount: data.count,
      revenue: Number(data.revenue.toFixed(2))
    })).sort((a, b) => b.revenue - a.revenue);
  }
}