// Database configuration and utilities
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'menu',
  charset: 'utf8mb4'
};

// Helper functions for database operations
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 2 
  });
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('pt-BR');
};

// Status mappings
export const ORDER_STATUS = {
  '1': 'Aberto',
  '2': 'Preparando',
  '3': 'Saiu para entrega',
  '4': 'Finalizado',
  '5': 'Cancelado'
} as const;

export const PAYMENT_STATUS = {
  'pending': 'Pendente',
  'paid': 'Pago',
  'cancelled': 'Cancelado'
} as const;
