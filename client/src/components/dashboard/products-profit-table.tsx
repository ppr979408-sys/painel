import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ProductsProfitTable() {
  const { user } = useAuth();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products/all', user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded"></div>;
  }

  const totalRevenue = Array.isArray(products) ? products.reduce((sum: number, product: any) => sum + product.revenue, 0) : 0;
  const totalProfit = Array.isArray(products) ? products.reduce((sum: number, product: any) => sum + product.profit, 0) : 0;

  const exportProductsToCSV = () => {
    if (!Array.isArray(products) || products.length === 0) {
      alert('Não há dados para exportar');
      return;
    }

    const headers = ['Produto', 'Categoria', 'Preço Venda', 'Custo', 'Vendas', 'Receita', 'Lucro', 'Margem %', 'Estoque'];
    const csvData = products.map(product => {
      const unitProfit = parseFloat(product.preco_venda) - parseFloat(product.preco_custo);
      const unitMargin = parseFloat(product.preco_venda) > 0 ? 
        (unitProfit / parseFloat(product.preco_venda)) * 100 : 0;
      
      return [
        product.titulo,
        product.categoria,
        `R$ ${parseFloat(product.preco_venda).toFixed(2)}`,
        `R$ ${parseFloat(product.preco_custo).toFixed(2)}`,
        product.salesCount,
        `R$ ${product.revenue.toFixed(2)}`,
        `R$ ${product.profit.toFixed(2)}`,
        `${unitMargin.toFixed(1)}%`,
        product.estoque
      ];
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `produtos-lucro-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Lucro por Produto</CardTitle>
            <CardDescription>
              Análise detalhada da rentabilidade de cada produto
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportProductsToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-600">Receita Total dos Produtos</p>
            <p className="text-xl font-bold text-blue-900">
              R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-600">Lucro Total dos Produtos</p>
            <p className="text-xl font-bold text-green-900">
              R$ {totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Preço Venda</TableHead>
                <TableHead className="text-right">Custo</TableHead>
                <TableHead className="text-right">Vendas</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Lucro</TableHead>
                <TableHead className="text-right">Margem</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Estoque</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(products) && products.map((product: any) => {
                const unitProfit = parseFloat(product.preco_venda) - parseFloat(product.preco_custo);
                const unitMargin = parseFloat(product.preco_venda) > 0 ? 
                  (unitProfit / parseFloat(product.preco_venda)) * 100 : 0;
                
                return (
                  <TableRow key={product.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{product.titulo}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {parseFloat(product.preco_venda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      R$ {parseFloat(product.preco_custo).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">{product.salesCount}</TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${product.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {product.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${unitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {unitMargin.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={Math.min(product.margin, 100)} className="w-16 h-2" />
                        <span className="text-xs text-gray-500">{product.margin}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.estoque > 20 ? "default" : product.estoque > 5 ? "secondary" : "destructive"}>
                        {product.estoque} un.
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}