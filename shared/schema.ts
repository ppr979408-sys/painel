import { z } from "zod";
import { pgTable, varchar, text, serial, timestamp, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

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

// Database Tables (Drizzle PostgreSQL Schema)

// Clientes table
export const clientes = pgTable('clientes', {
  id: serial('id').primaryKey(),
  codigo_loja: varchar('codigo_loja', { length: 50 }).notNull().unique(),
  nome: varchar('nome', { length: 100 }).notNull(),
  sobrenome: varchar('sobrenome', { length: 100 }).notNull(),
  nome_empresa: varchar('nome_empresa', { length: 200 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  telefone: varchar('telefone', { length: 20 }),
  endereco: text('endereco'),
  cidade: varchar('cidade', { length: 100 }),
  uf: varchar('uf', { length: 2 }),
  status: varchar('status', { length: 1 }).default('1'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

// Cadastrofeed table (produtos)
export const cadastrofeed = pgTable('cadastrofeed', {
  id: serial('id').primaryKey(),
  titulo: varchar('titulo', { length: 200 }).notNull(),
  preco_venda: decimal('preco_venda', { precision: 10, scale: 2 }).notNull(),
  preco_custo: decimal('preco_custo', { precision: 10, scale: 2 }).notNull(),
  categoria: varchar('categoria', { length: 100 }).notNull(),
  descricao: text('descricao'),
  estoque: integer('estoque').default(0),
  status: varchar('status', { length: 1 }).default('1'),
  codigo_loja: varchar('codigo_loja', { length: 50 }).notNull(),
  id_loja: varchar('id_loja', { length: 50 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});

// ComandaPedidos table
export const comandaPedidos = pgTable('ComandaPedidos', {
  IdPedido: serial('IdPedido').primaryKey(),
  comanda: varchar('comanda', { length: 50 }).notNull(),
  user_name: varchar('user_name', { length: 100 }).notNull(),
  user_id: varchar('user_id', { length: 50 }),
  IdItem: varchar('IdItem', { length: 50 }).notNull(),
  preco: decimal('preco', { precision: 10, scale: 2 }).notNull(),
  QtdeItem: integer('QtdeItem').notNull(),
  status: varchar('status', { length: 2 }).notNull(),
  data_completa: timestamp('data_completa').defaultNow(),
  codigo_loja: varchar('codigo_loja', { length: 50 }).notNull(),
  id_loja: varchar('id_loja', { length: 50 })
});

// Insert schemas for forms
export const insertClienteSchema = createInsertSchema(clientes).omit({
  id: true,
  created_at: true,
  updated_at: true
});

export const insertCadastrofeedSchema = createInsertSchema(cadastrofeed).omit({
  id: true,
  created_at: true,
  updated_at: true
});

export const insertComandaPedidosSchema = createInsertSchema(comandaPedidos).omit({
  IdPedido: true,
  data_completa: true
});

// Types for database operations
export type Cliente = typeof clientes.$inferSelect;
export type Produto = typeof cadastrofeed.$inferSelect;
export type Pedido = typeof comandaPedidos.$inferSelect;
export type InsertCliente = z.infer<typeof insertClienteSchema>;
export type InsertProduto = z.infer<typeof insertCadastrofeedSchema>;
export type InsertPedido = z.infer<typeof insertComandaPedidosSchema>;
