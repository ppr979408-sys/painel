import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download } from "lucide-react";
import { useAuth } from "@/App";

export default function OrdersTable() {
  const { user } = useAuth();
  
  const { data: orders, isLoading } = useQuery({
    queryKey: ["/api/orders/recent", user?.codigo_loja],
    enabled: !!user?.codigo_loja,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "4":
        return <Badge className="bg-green-100 text-green-800">Entregue</Badge>;
      case "2":
        return <Badge className="bg-yellow-100 text-yellow-800">Em preparo</Badge>;
      case "3":
        return <Badge className="bg-blue-100 text-blue-800">Saiu para entrega</Badge>;
      case "5":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pendente</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pedidos Recentes</CardTitle>
          <Button variant="outline" size="sm">Ver todos</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Margem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Carregando pedidos...
                  </TableCell>
                </TableRow>
              ) : orders && orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow key={order.comanda} className="hover:bg-gray-50">
                    <TableCell className="font-medium">#{order.comanda}</TableCell>
                    <TableCell>{order.user_name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {order.items || "N/A"}
                    </TableCell>
                    <TableCell>
                      R$ {order.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-green-600">
                      R$ {order.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({order.margin}%)
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Nenhum pedido encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
