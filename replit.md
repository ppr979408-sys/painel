# Restaurant Dashboard Analytics System

## Overview

This is a full-stack restaurant analytics dashboard built with React, Express.js, and MySQL. The system provides comprehensive business intelligence for restaurant owners, tracking sales performance, product analytics, profit margins, and generating detailed reports. The application features a modern, responsive interface with real-time data visualization and multi-page analytics views.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom restaurant-themed color palette
- **State Management**: React Context for authentication, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design with structured error handling
- **Session Management**: Basic authentication system (production-ready session management recommended)
- **Middleware**: Request logging, JSON parsing, CORS handling

### Database Strategy
- **Production Exclusive**: MySQL database from InfinityFree configured for production deployment only
- **InfinityFree Integration**: Direct connection using mysql2 driver with InfinityFree-specific settings
- **Real Restaurant Schema**: Uses authentic restaurant tables: acesso_cliente, cadastrofeed, ComandaPedidos
- **Environment Configuration**: MYSQL_HOST=sql100.infinityfree.com, MYSQL_DATABASE=if0_39752118_menu
- **Development Limitation**: InfinityFree blocks external connections in development, works in production

## Key Components

### Authentication System
- **Production Login**: Email/password authentication against acesso_cliente table in InfinityFree MySQL
- **User Context**: React Context providing global authentication state
- **Route Protection**: Conditional rendering based on authentication status
- **Real User Data**: Authenticates restaurant owners with actual credentials from database

### Dashboard Analytics
- **KPI Metrics**: Real-time sales, orders, margin, and revenue tracking
- **Sales Visualization**: Interactive charts using Recharts library
- **Recent Orders**: Live order monitoring with status tracking
- **Performance Indicators**: Color-coded trend analysis

### Product Performance Analysis
- **Top Products**: Best-selling items with quantity and revenue metrics
- **Low Performers**: Underperforming products requiring attention
- **Inventory Tracking**: Stock levels and product status monitoring
- **Category Analysis**: Performance breakdown by product categories

### Profit & Margin Analytics
- **Margin Calculation**: Cost vs. selling price analysis
- **Category Margins**: Profitability by product category
- **Trend Analysis**: Historical margin performance tracking
- **Visual Reports**: Bar and line charts for margin visualization

### Reporting System
- **Report Generation**: PDF and Excel format options
- **Historical Reports**: Archive of previously generated reports
- **Custom Date Ranges**: Flexible reporting periods
- **Export Functionality**: Download reports for external use

## Data Flow

### Client-Server Communication
1. **API Requests**: Fetch API with credential inclusion for session management
2. **Query Management**: TanStack Query handles caching, refetching, and error states
3. **Real-time Updates**: Periodic data refreshing for dashboard metrics
4. **Error Handling**: Centralized error management with user-friendly notifications

### Database Operations
1. **Authentication**: User credential verification against cliente table
2. **Metrics Aggregation**: Complex queries for dashboard KPI calculations
3. **Sales Analysis**: Time-based queries for trend analysis
4. **Product Analytics**: Join queries across products and orders tables
5. **Margin Calculations**: Real-time profit margin computations

## External Dependencies

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Recharts**: Chart and visualization library

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across the application
- **ESBuild**: Production bundling
- **Replit Integration**: Development environment plugins

### Database & ORM
- **Drizzle Kit**: Database migrations and schema management
- **MySQL2**: Production-grade MySQL driver
- **Neon Database**: Serverless PostgreSQL option

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reloading**: Real-time code updates during development
- **Environment Variables**: Database credentials and configuration
- **Type Checking**: Continuous TypeScript compilation

### Production Deployment
- **Build Process**: Vite frontend build + ESBuild backend compilation
- **Static Assets**: Frontend served from Express static middleware
- **Database Connection**: Environment-based MySQL connection
- **Error Handling**: Production-grade error logging and monitoring

### Configuration Management
- **Environment Variables**: MySQL connection settings, feature flags
- **Database Toggle**: USE_MYSQL=true switches from test data to real MySQL
- **MySQL Config**: MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
- **Build Scripts**: Separate development and production configurations
- **Asset Management**: Optimized static asset serving
- **Performance**: Caching strategies for API responses and static assets

### MySQL Database Integration (Production Ready)
- **InfinityFree Database**: Configured exclusively for if0_39752118_menu database
- **Authentication**: Uses 'acesso_cliente' table for restaurant owner authentication
- **Products**: 'cadastrofeed' table contains real menu items with costs and prices
- **Orders**: 'ComandaPedidos' table tracks actual sales with profit calculations
- **Live Analytics**: Dashboard displays real-time data from production database
- **Production Deployment**: System configured to work only when properly deployed

### Security Considerations
- **Authentication**: Session-based user authentication (needs enhancement)
- **Input Validation**: Zod schema validation for API requests
- **SQL Injection Prevention**: Parameterized queries with mysql2
- **CORS Configuration**: Proper cross-origin resource sharing setup