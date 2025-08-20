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
      const user = await storage.authenticateUser(credentials);
      
      if (user) {
        // In production, use proper session management
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Credenciais inválidas" });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: "Dados inválidos" });
    }
  });

  // Database connection test endpoint
  app.get("/api/test-connection", async (req, res) => {
    try {
      const connection = await (storage as any).getConnection();
      const [rows] = await connection.execute('SELECT 1 as test, NOW() as timestamp');
      
      // Test specific tables
      const [clientesCount] = await connection.execute('SELECT COUNT(*) as count FROM acesso_cliente');
      const [produtosCount] = await connection.execute('SELECT COUNT(*) as count FROM cadastrofeed');
      const [pedidosCount] = await connection.execute('SELECT COUNT(*) as count FROM ComandaPedidos');
      
      res.json({ 
        success: true, 
        message: "Conexão MySQL InfinityFree funcionando!", 
        data: {
          test: (rows as any[])[0],
          tables: {
            acesso_cliente: (clientesCount as any[])[0].count,
            cadastrofeed: (produtosCount as any[])[0].count,
            ComandaPedidos: (pedidosCount as any[])[0].count
          },
          host: process.env.MYSQL_HOST,
          database: process.env.MYSQL_DATABASE
        }
      });
    } catch (error) {
      console.error('Database connection test failed:', error);
      res.status(500).json({ 
        success: false, 
        message: "Erro na conexão com MySQL", 
        error: error instanceof Error ? error.message : 'Unknown error',
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE
      });
    }
  });

  // Dashboard metrics
  app.get("/api/dashboard/metrics/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
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
      const salesData = await storage.getSalesData(codigoLoja, period as string);
      res.json(salesData);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar dados de vendas" });
    }
  });

  // Recent orders
  app.get("/api/orders/recent/:codigoLoja", async (req, res) => {
    try {
      const { codigoLoja } = req.params;
      const { limit = "10" } = req.query;
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
      const orders = await storage.getDetailedOrdersWithProfit(codigoLoja);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Erro ao carregar pedidos detalhados" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
