import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Percent, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line 
} from "recharts";

export default function ProfitsPage() {
  const { user } = useAuth();
  
  const { data: marginAnalysis, isLoading: marginLoading } = useQuery({
    queryKey: ["/api/margins", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  const { data: salesByCategory } = useQuery({
    queryKey: ["/api/sales/category", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  const { data: allProducts } = useQuery({
    queryKey: ["/api/products/all", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  const categoryData = marginAnalysis?.byCategory?.map(cat => ({
    categoria: cat.categoria,
    margin: cat.margin
  })) || [];

  const evolutionData = [
    { mes: 'Jan', margin: 65.2 },
    { mes: 'Fev', margin: 67.8 },
    { mes: 'Mar', margin: 63.4 },
    { mes: 'Abr', margin: 68.9 },
    { mes: 'Mai', margin: 66.7 },
    { mes: 'Jun', margin: 68.3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Análise de Margens" />
        
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise de Margens</h2>
            <p className="text-gray-600">Acompanhe a rentabilidade dos seus produtos e pedidos</p>
          </div>

          {/* Margin Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Margem Bruta Total</h3>
                  <Percent className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {marginAnalysis?.overall?.avgMargin?.toFixed(1) || '0'}%
                </p>
                <p className="text-sm text-gray-500">
                  R$ {(marginAnalysis?.overall?.totalRevenue - marginAnalysis?.overall?.totalCost)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'} de lucro
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Melhor Margem</h3>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...(categoryData.map(c => c.margin) || [0])).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  {categoryData.find(c => c.margin === Math.max(...categoryData.map(cat => cat.margin)))?.categoria || 'N/A'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Menor Margem</h3>
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.min(...(categoryData.map(c => c.margin) || [0])).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  {categoryData.find(c => c.margin === Math.min(...categoryData.map(cat => cat.margin)))?.categoria || 'N/A'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">Custo Total</h3>
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {marginAnalysis?.overall?.totalCost?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                </p>
                <p className="text-sm text-gray-500">
                  {marginAnalysis?.overall?.totalRevenue > 0 
                    ? ((marginAnalysis.overall.totalCost / marginAnalysis.overall.totalRevenue) * 100).toFixed(1)
                    : '0'}% da receita
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Margin Analysis Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Margem por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="categoria" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Margem']} />
                      <Bar dataKey="margin" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Margem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Margem Média']} />
                      <Line 
                        type="monotone" 
                        dataKey="margin" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: "#10B981" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Margin Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada por Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Preço Venda</TableHead>
                      <TableHead>Custo</TableHead>
                      <TableHead>Margem</TableHead>
                      <TableHead>Lucro Unit.</TableHead>
                      <TableHead>Lucro Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProducts?.map((product) => {
                      const precoVenda = parseFloat(product.preco_venda || '0');
                      const precoCusto = parseFloat(product.preco_custo || '0');
                      const lucroUnitario = precoVenda - precoCusto;
                      const lucroTotal = lucroUnitario * product.salesCount;
                      
                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="font-medium text-gray-900">{product.titulo}</div>
                          </TableCell>
                          <TableCell>
                            R$ {precoVenda.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            R$ {precoCusto.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.margin > 60 ? "default" : product.margin > 40 ? "secondary" : "destructive"}
                            >
                              {product.margin.toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-green-600">
                            R$ {lucroUnitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-green-600 font-semibold">
                            R$ {lucroTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
