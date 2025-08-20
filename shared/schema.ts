import { z } from "zod";

// Cliente schema (restaurant owner)
export const clienteSchema = z.object({
  codigo_loja: z.string(),
  nome: z.string(),
  sobrenome: z.string(),
  nome_empresa: z.string(),
  email: z.string().email(),
  telefone: z.string(),
  endereco: z.string(),
  cidade: z.string(),
  uf: z.string(),
  status: z.string(),
});

// Product schema
export const produtoSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  preco_venda: z.string(),
  preco_custo: z.string(),
  categoria: z.string(),
  descricao: z.string(),
  estoque: z.string(),
  status: z.string(),
  codigo_loja: z.string(),
  id_loja: z.string(),
});

// Order schema
export const pedidoSchema = z.object({
  IdPedido: z.number(),
  comanda: z.string(),
  user_name: z.string(),
  user_id: z.string(),
  IdItem: z.string(),
  preco: z.string(),
  QtdeItem: z.number(),
  status: z.string(),
  data: z.string(),
  codigo_loja: z.string(),
  id_loja: z.string(),
});

// Login request schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Dashboard metrics schema
export const dashboardMetricsSchema = z.object({
  todaySales: z.number(),
  todayOrders: z.number(),
  averageMargin: z.number(),
  averageTicket: z.number(),
  totalRevenue: z.number(),
  totalProfit: z.number(),
});

// Sales data schema
export const salesDataSchema = z.object({
  date: z.string(),
  revenue: z.number(),
  orders: z.number(),
  margin: z.number(),
});

// Product performance schema
export const productPerformanceSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  categoria: z.string(),
  salesCount: z.number(),
  revenue: z.number(),
  margin: z.number(),
  profit: z.number(),
});

export type Cliente = z.infer<typeof clienteSchema>;
export type Produto = z.infer<typeof produtoSchema>;
export type Pedido = z.infer<typeof pedidoSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type DashboardMetrics = z.infer<typeof dashboardMetricsSchema>;
export type SalesData = z.infer<typeof salesDataSchema>;
export type ProductPerformance = z.infer<typeof productPerformanceSchema>;