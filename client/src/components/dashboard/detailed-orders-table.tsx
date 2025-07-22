import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

export default function DetailedOrdersTable() {
  const { user } = useAuth();
  
  const { data: detailedOrders, isLoading } = useQuery({
    queryKey: ['/api/orders/detailed', user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded"></div>;
  }

  const totalReceita = Array.isArray(detailedOrders) ? detailedOrders.reduce((sum: number, order: any) => sum + order.receita, 0) : 0;
  const totalLucro = Array.isArray(detailedOrders) ? detailedOrders.reduce((sum: number, order: any) => sum + order.lucro, 0) : 0;
  const margemMedia = totalReceita > 0 ? (totalLucro / totalReceita) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-500';
      case 'Em andamento': return 'bg-yellow-500';
      case 'Cancelado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">Pedidos Detalhados com Lucro</CardTitle>
            <CardDescription>
              Análise completa de cada pedido vendido com cálculo de lucro
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-blue-600">Receita Total</p>
            <p className="text-xl font-bold text-blue-900">
              R$ {totalReceita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-green-600">Lucro Total</p>
            <p className="text-xl font-bold text-green-900">
              R$ {totalLucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-purple-600">Margem Média</p>
            <p className="text-xl font-bold text-purple-900">
              {margemMedia.toFixed(1)}%
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comanda</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Qtd</TableHead>
                <TableHead className="text-right">Preço Unit.</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Custo</TableHead>
                <TableHead className="text-right">Lucro</TableHead>
                <TableHead className="text-right">Margem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(detailedOrders) && detailedOrders.map((order: any, index: number) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-mono">{order.comanda}</TableCell>
                  <TableCell>{order.user_name}</TableCell>
                  <TableCell className="font-medium">{order.product_name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{order.categoria}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.quantidade}</TableCell>
                  <TableCell className="text-right">
                    R$ {order.preco_unitario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {order.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right text-red-600">
                    R$ {order.custo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${order.lucro >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {order.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${order.margem >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {order.margem.toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`} title={order.status}></div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {order.data_formatada}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}