import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/App";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Eye, TrendingUp, TrendingDown } from "lucide-react";

export default function ProductsPage() {
  const { user } = useAuth();
  
  const { data: topProducts, isLoading: topLoading } = useQuery({
    queryKey: ["/api/products/top", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  const { data: lowProducts, isLoading: lowLoading } = useQuery({
    queryKey: ["/api/products/low", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  const { data: allProducts, isLoading: allLoading } = useQuery({
    queryKey: ["/api/products/all", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <Header title="Desempenho de Produtos" />
        
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Desempenho de Produtos</h2>
            <p className="text-gray-600">Analise quais produtos estão performando melhor</p>
          </div>

          {/* Top and Low Performing Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Produtos Mais Vendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLoading ? (
                    <div className="text-center py-8 text-gray-500">Carregando...</div>
                  ) : (
                    topProducts?.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-green-600 font-semibold">{index + 1}</span>
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
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Low Performance Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2 text-orange-600" />
                  Produtos com Baixa Saída
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowLoading ? (
                    <div className="text-center py-8 text-gray-500">Carregando...</div>
                  ) : (
                    lowProducts?.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-orange-600 font-semibold">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{product.titulo}</h4>
                            <p className="text-sm text-gray-600">{product.categoria}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{product.salesCount} vendas</p>
                          <p className="text-sm text-orange-600">
                            R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Performance Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Análise Completa de Produtos</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Vendas</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Margem</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          Carregando produtos...
                        </TableCell>
                      </TableRow>
                    ) : (
                      allProducts?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{product.titulo}</div>
                              <div className="text-sm text-gray-500">
                                R$ {parseFloat(product.preco_venda || '0').toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{product.categoria}</TableCell>
                          <TableCell>{product.salesCount}</TableCell>
                          <TableCell>
                            R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.margin > 60 ? "default" : product.margin > 40 ? "secondary" : "destructive"}
                            >
                              {product.margin.toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell>{product.estoque || 'N/A'} un.</TableCell>
                          <TableCell>
                            <Badge variant="default">Ativo</Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
