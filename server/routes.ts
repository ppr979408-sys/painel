import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication route
  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      
      // Check if we're in development mode and MySQL is not available
      const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
      
      if (isDevelopment) {
        // Development mode with demo user for testing UI
        const demoUser = {
          codigo_loja: "DEMO001",
          nome: "Admin",
          sobrenome: "Demo",
          nome_empresa: "Restaurante Demo",
          email: credentials.email,
          telefone: "(11) 99999-9999",
          endereco: "Rua Demo, 123",
          cidade: "São Paulo",
          uf: "SP",
          status: "ativo"
        };
        
        res.json({ 
          success: true, 
          user: demoUser,
          mode: "development",
          note: "Usuário de demonstração - MySQL funcionará apenas em produção"
        });
        return;
      }
      
      // Production mode - try real authentication
      const user = await storage.authenticateUser(credentials);
      
      if (user) {
        res.json({ success: true, user, mode: "production" });
      } else {
        res.status(401).json({ success: false, message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error("Auth error:", error);
      
      // If it's a connection error in production, return specific message
      if (error instanceof Error && error.message.includes('ENOTFOUND')) {
        res.status(503).json({ 
          success: false, 
          message: "Serviço de banco de dados temporariamente indisponível",
          note: "InfinityFree MySQL requer que a aplicação esteja em produção" 
        });
      } else {
        res.status(400).json({ success: false, message: "Erro na validação dos dados" });
      }
    }
  });

  // Production database status endpoint
  app.get("/api/database-status", async (req, res) => {
    try {
      const connection = await (storage as any).getConnection();
      const [rows] = await connection.execute('SELECT CONNECTION_ID() as connection_id, DATABASE() as current_db, NOW() as server_time');
      
      // Test production tables
      const [clientesResult] = await connection.execute('SELECT COUNT(*) as count FROM acesso_cliente');
      const [feedResult] = await connection.execute('SELECT COUNT(*) as count FROM cadastrofeed');
      const [pedidosResult] = await connection.execute('SELECT COUNT(*) as count FROM ComandaPedidos');
      
      res.json({
        status: "connected",
        message: "MySQL InfinityFree conectado com sucesso",
        connection_info: (rows as any[])[0],
        tables_status: {
          acesso_cliente: (clientesResult as any[])[0].count,
          cadastrofeed: (feedResult as any[])[0].count,
          ComandaPedidos: (pedidosResult as any[])[0].count
        },
        database_config: {
          host: process.env.MYSQL_HOST,
          database: process.env.MYSQL_DATABASE,
          user: process.env.MYSQL_USER
        }
      });
    } catch (error) {
      res.status(503).json({
        status: "connection_error",
        message: error instanceof Error ? error.message : "Erro desconhecido na conexão",
        environment: process.env.NODE_ENV || "development",
        note: process.env.NODE_ENV === "development" 
          ? "InfinityFree MySQL requer deployment em produção para funcionar" 
          : "Verifique credenciais e status do servidor MySQL"
      });
    }
  });

  // Production deployment readiness check
  app.get("/api/deployment-status", (req, res) => {
    const requiredEnvVars = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE'];
    const envStatus = requiredEnvVars.reduce((acc, varName) => {
      acc[varName] = process.env[varName] ? '✅ Configurado' : '❌ Faltando';
      return acc;
    }, {} as Record<string, string>);

    const allConfigured = requiredEnvVars.every(varName => process.env[varName]);

    res.json({
      deployment_ready: allConfigured,
      message: allConfigured 
        ? "Sistema configurado para produção com InfinityFree MySQL"
        : "Variáveis de ambiente faltando para deployment",
      environment_variables: envStatus,
      database_config: {
        provider: "InfinityFree MySQL",
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        connection_type: "Production Only"
      },
      deployment_notes: [
        "InfinityFree MySQL funciona apenas em aplicações hospedadas",
        "Conexões diretas do desenvolvimento são bloqueadas",
        "Deploy da aplicação habilitará todas as funcionalidades"
      ]
    });
  });

  // Dashboard metrics
  app.get("/api/dashboard/metrics/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      
      if (process.env.NODE_ENV === 'development') {
        // Demo data for development
        const demoMetrics = {
          todaySales: 15420.50,
          todayOrders: 47,
          averageMargin: 32.5,
          averageTicket: 328.30,
          totalRevenue: 245780.30,
          totalProfit: 79904.00
        };
        res.json(demoMetrics);
        return;
      }
      
      const metrics = await storage.getDashboardMetrics(codigoLoja);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar métricas" });
    }
  });

  // Sales data
  app.get("/api/sales/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      const { period = "7" } = req.query;
      
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        // Demo sales data for development
        const demoSalesData = [
          { date: "2025-08-14", revenue: 2450.80, orders: 8, margin: 31.2 },
          { date: "2025-08-15", revenue: 3200.50, orders: 12, margin: 28.5 },
          { date: "2025-08-16", revenue: 1980.30, orders: 6, margin: 35.1 },
          { date: "2025-08-17", revenue: 4150.20, orders: 15, margin: 29.8 },
          { date: "2025-08-18", revenue: 2890.70, orders: 10, margin: 32.4 },
          { date: "2025-08-19", revenue: 3650.40, orders: 13, margin: 30.7 },
          { date: "2025-08-20", revenue: 4280.90, orders: 16, margin: 33.2 }
        ];
        res.json(demoSalesData);
        return;
      }
      
      const salesData = await storage.getSalesData(codigoLoja, period as string);
      res.json(salesData);
    } catch (error) {
      console.error("Sales data error:", error);
      res.status(500).json({ error: "Erro ao carregar dados de vendas", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  // Recent orders
  app.get("/api/orders/recent/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      const { limit = "10" } = req.query;
      
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        // Demo recent orders for development
        const demoOrders = [
          { IdPedido: 1001, comanda: "Mesa 5", user_name: "João Silva", user_id: "1", IdItem: "Pizza Margherita", preco: "45.90", QtdeItem: 2, status: "Entregue", data: "2025-08-20 18:30:00", codigo_loja: "DEMO001", id_loja: "DEMO001" },
          { IdPedido: 1002, comanda: "Mesa 3", user_name: "Maria Santos", user_id: "2", IdItem: "Hambúrguer Artesanal", preco: "32.50", QtdeItem: 1, status: "Preparando", data: "2025-08-20 18:15:00", codigo_loja: "DEMO001", id_loja: "DEMO001" },
          { IdPedido: 1003, comanda: "Balcão", user_name: "Pedro Costa", user_id: "3", IdItem: "Salada Caesar", preco: "28.90", QtdeItem: 1, status: "Entregue", data: "2025-08-20 17:45:00", codigo_loja: "DEMO001", id_loja: "DEMO001" }
        ];
        res.json(demoOrders.slice(0, parseInt(limit as string)));
        return;
      }
      
      const orders = await storage.getRecentOrders(codigoLoja, parseInt(limit as string));
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar pedidos recentes" });
    }
  });

  // Top products
  app.get("/api/products/top/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      const { limit = "5" } = req.query;
      
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        // Demo top products for development
        const demoTopProducts = [
          { id: 1, titulo: "Pizza Margherita", categoria: "Pizzas", salesCount: 45, revenue: 2025.50, preco_venda: "45.00", preco_custo: "18.50", status: "ativo" },
          { id: 2, titulo: "Hambúrguer Artesanal", categoria: "Hambúrgueres", salesCount: 38, revenue: 1235.00, preco_venda: "32.50", preco_custo: "15.20", status: "ativo" },
          { id: 3, titulo: "Salada Caesar", categoria: "Saladas", salesCount: 32, revenue: 924.80, preco_venda: "28.90", preco_custo: "12.30", status: "ativo" },
          { id: 4, titulo: "Lasanha Bolonhesa", categoria: "Massas", salesCount: 28, revenue: 1120.00, preco_venda: "40.00", preco_custo: "16.80", status: "ativo" },
          { id: 5, titulo: "Frango Grelhado", categoria: "Carnes", salesCount: 25, revenue: 875.00, preco_venda: "35.00", preco_custo: "14.90", status: "ativo" }
        ];
        res.json(demoTopProducts.slice(0, parseInt(limit as string)));
        return;
      }
      
      const products = await storage.getTopProducts(codigoLoja, parseInt(limit as string));
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar produtos mais vendidos" });
    }
  });

  // Low performing products
  app.get("/api/products/low/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      const { limit = "5" } = req.query;
      
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        // Demo low performing products for development
        const demoLowProducts = [
          { id: 10, titulo: "Sopa do Dia", categoria: "Sopas", salesCount: 3, revenue: 84.00, preco_venda: "28.00", preco_custo: "9.50", status: "ativo" },
          { id: 11, titulo: "Torta de Limão", categoria: "Sobremesas", salesCount: 5, revenue: 125.00, preco_venda: "25.00", preco_custo: "8.20", status: "ativo" }
        ];
        res.json(demoLowProducts.slice(0, parseInt(limit as string)));
        return;
      }
      
      const products = await storage.getLowPerformingProducts(codigoLoja, parseInt(limit as string));
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar produtos com baixa saída" });
    }
  });

  // All products
  app.get("/api/products/all/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        // Demo all products for development
        const demoAllProducts = [
          { id: 1, titulo: "Pizza Margherita", preco_venda: "45.00", preco_custo: "18.50", categoria: "Pizzas", descricao: "Pizza clássica com molho de tomate, mussarela e manjericão", estoque: "10", status: "ativo", codigo_loja: "DEMO001", id_loja: "DEMO001" },
          { id: 2, titulo: "Hambúrguer Artesanal", preco_venda: "32.50", preco_custo: "15.20", categoria: "Hambúrgueres", descricao: "Hambúrguer com carne artesanal, alface, tomate e molho especial", estoque: "8", status: "ativo", codigo_loja: "DEMO001", id_loja: "DEMO001" },
          { id: 3, titulo: "Salada Caesar", preco_venda: "28.90", preco_custo: "12.30", categoria: "Saladas", descricao: "Salada com alface americana, croutons, parmesão e molho caesar", estoque: "15", status: "ativo", codigo_loja: "DEMO001", id_loja: "DEMO001" }
        ];
        res.json(demoAllProducts);
        return;
      }
      
      const products = await storage.getAllProducts(codigoLoja);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar todos os produtos" });
    }
  });

  // Margin analysis
  app.get("/api/margins/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        // Demo margin analysis for development
        const demoMargins = [
          { categoria: "Pizzas", averageMargin: 58.9, totalRevenue: 2025.50, totalCost: 832.50, count: 45 },
          { categoria: "Hambúrgueres", averageMargin: 53.2, totalRevenue: 1235.00, totalCost: 577.60, count: 38 },
          { categoria: "Saladas", averageMargin: 57.4, totalRevenue: 924.80, totalCost: 393.60, count: 32 },
          { categoria: "Massas", averageMargin: 58.0, totalRevenue: 1120.00, totalCost: 470.40, count: 28 }
        ];
        res.json(demoMargins);
        return;
      }
      
      const margins = await storage.getMarginAnalysis(codigoLoja);
      res.json(margins);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar análise de margens" });
    }
  });

  // Sales by category
  app.get("/api/sales/category/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      const salesByCategory = await storage.getSalesByCategory(codigoLoja);
      res.json(salesByCategory);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar vendas por categoria" });
    }
  });

  // Detailed orders with profit
  app.get("/api/orders/detailed/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      
      if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        // Demo detailed orders with profit calculations for development
        const demoDetailedOrders = [
          { 
            comanda: "Mesa 5", 
            user_name: "João Silva", 
            items: "2x Pizza Margherita", 
            total: 91.80, 
            profit: 54.70, 
            margin: 59.6, 
            status: "Entregue" 
          },
          { 
            comanda: "Mesa 3", 
            user_name: "Maria Santos", 
            items: "1x Hambúrguer Artesanal", 
            total: 32.50, 
            profit: 17.30, 
            margin: 53.2, 
            status: "Preparando" 
          },
          { 
            comanda: "Balcão", 
            user_name: "Pedro Costa", 
            items: "1x Salada Caesar", 
            total: 28.90, 
            profit: 16.60, 
            margin: 57.4, 
            status: "Entregue" 
          }
        ];
        res.json(demoDetailedOrders);
        return;
      }
      
      const orders = await storage.getDetailedOrdersWithProfit(codigoLoja);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar pedidos detalhados" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
