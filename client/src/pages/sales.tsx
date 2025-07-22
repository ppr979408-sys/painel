import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SalesChart from "@/components/dashboard/sales-chart";
import { TrendingUp, DollarSign, ShoppingBag } from "lucide-react";

export default function SalesPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState("7");
  
  const { data: salesData, isLoading } = useQuery({
    queryKey: ["/api/sales", user?.codigo_loja, period],
    enabled: !!user?.codigo_loja,
  });

  const { data: metrics } = useQuery({
    queryKey: ["/api/dashboard/metrics", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  const totalRevenue = salesData?.reduce((sum, day) => sum + day.revenue, 0) || 0;
  const totalOrders = salesData?.reduce((sum, day) => sum + day.orders, 0) || 0;
  const avgMargin = salesData?.length > 0 
    ? salesData.reduce((sum, day) => sum + day.margin, 0) / salesData.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Análise de Vendas" />
        
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise de Vendas</h2>
            <p className="text-gray-600">Acompanhe o desempenho detalhado das suas vendas</p>
          </div>

          {/* Sales Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">Últimos 7 dias</SelectItem>
                      <SelectItem value="30">Últimos 30 dias</SelectItem>
                      <SelectItem value="90">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      <SelectItem value="acai">Açaí</SelectItem>
                      <SelectItem value="bebidas">Bebidas</SelectItem>
                      <SelectItem value="lanches">Lanches</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="4">Concluído</SelectItem>
                      <SelectItem value="2">Em andamento</SelectItem>
                      <SelectItem value="5">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Receita Total</h3>
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+15.3% vs período anterior</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total de Pedidos</h3>
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">{totalOrders}</p>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+8.7% vs período anterior</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Margem Média</h3>
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {avgMargin.toFixed(1)}%
                </p>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-orange-500 text-sm font-medium">-2.1% vs período anterior</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Sales Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Evolução das Vendas</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="default" size="sm">Receita</Button>
                  <Button variant="outline" size="sm">Pedidos</Button>
                  <Button variant="outline" size="sm">Margem</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <SalesChart data={salesData || []} />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
