import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/App";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import KPICard from "@/components/dashboard/kpi-card";
import SalesChart from "@/components/dashboard/sales-chart";
import OrdersTable from "@/components/dashboard/orders-table";
import { 
  ShoppingCart, 
  Receipt, 
  Percent, 
  Coins,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import type { DashboardMetrics, SalesData, ProductPerformance } from "@shared/schema";

export default function DashboardPage() {
  const { user } = useAuth();
  
  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
    queryFn: () => fetch(`/api/dashboard/metrics/${user?.codigo_loja}`).then(res => res.json()),
  });

  const { data: salesData = [] } = useQuery<SalesData[]>({
    queryKey: ["/api/sales", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
    queryFn: () => fetch(`/api/sales/${user?.codigo_loja}`).then(res => res.json()),
  });

  const { data: topProducts = [] } = useQuery<ProductPerformance[]>({
    queryKey: ["/api/products/top", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
    queryFn: () => fetch(`/api/products/top/${user?.codigo_loja}`).then(res => res.json()),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Dashboard" />
        
        <main className="p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Vendas Hoje"
              value={`R$ ${metrics?.todaySales?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}`}
              change="+12.5% vs ontem"
              changeType="positive"
              icon={ShoppingCart}
              iconColor="bg-blue-100 text-blue-600"
              isLoading={metricsLoading}
            />
            
            <KPICard
              title="Pedidos Hoje"
              value={metrics?.todayOrders?.toString() || '0'}
              change="+8 vs ontem"
              changeType="positive"
              icon={Receipt}
              iconColor="bg-green-100 text-green-600"
              isLoading={metricsLoading}
            />
            
            <KPICard
              title="Margem Média"
              value={`${metrics?.averageMargin?.toFixed(1) || '0'}%`}
              change="-2.1% vs ontem"
              changeType="negative"
              icon={Percent}
              iconColor="bg-orange-100 text-orange-600"
              isLoading={metricsLoading}
            />
            
            <KPICard
              title="Ticket Médio"
              value={`R$ ${metrics?.averageTicket?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}`}
              change="+R$ 3.20 vs ontem"
              changeType="positive"
              icon={Coins}
              iconColor="bg-emerald-100 text-emerald-600"
              isLoading={metricsLoading}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SalesChart data={salesData} />
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Produtos Mais Vendidos</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Ver todos</button>
              </div>
              
              <div className="space-y-4">
                {topProducts.length > 0 ? (
                  topProducts.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-semibold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{product.titulo}</h4>
                          <p className="text-sm text-gray-600">{product.categoria}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{product.salesCount} vendas</p>
                        <p className="text-sm text-green-600">
                          R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Carregando produtos...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          <OrdersTable />
        </main>
      </div>
    </div>
  );
}
