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
