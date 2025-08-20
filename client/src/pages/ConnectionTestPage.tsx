import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Database, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

interface ConnectionTestResult {
  success: boolean;
  message: string;
  data?: {
    test: {
      test: number;
      timestamp: string;
    };
    tables: {
      acesso_cliente: number;
      cadastrofeed: number;
      ComandaPedidos: number;
    };
    host: string;
    database: string;
  };
  error?: string;
  host?: string;
  database?: string;
}

export default function ConnectionTestPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: connectionResult, isLoading, refetch } = useQuery({
    queryKey: ['/api/test-connection'],
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Teste de Conexão MySQL
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Verifica a conectividade com o banco de dados InfinityFree
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <CardTitle>Status da Conexão</CardTitle>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isLoading || isRefreshing}
              size="sm"
              variant="outline"
              data-testid="button-refresh"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${(isLoading || isRefreshing) ? 'animate-spin' : ''}`} />
              Testar Novamente
            </Button>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Testando conexão...</span>
              </div>
            ) : connectionResult ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {(connectionResult as ConnectionTestResult).success ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Conectado
                      </Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <Badge variant="destructive">Desconectado</Badge>
                    </>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400" data-testid="text-connection-message">
                  {(connectionResult as ConnectionTestResult).message}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Host:</span>
                    <p className="text-gray-600 dark:text-gray-400" data-testid="text-host">
                      {(connectionResult as ConnectionTestResult).data?.host || (connectionResult as ConnectionTestResult).host || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Database:</span>
                    <p className="text-gray-600 dark:text-gray-400" data-testid="text-database">
                      {(connectionResult as ConnectionTestResult).data?.database || (connectionResult as ConnectionTestResult).database || 'N/A'}
                    </p>
                  </div>
                </div>

                {(connectionResult as ConnectionTestResult).error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-800 dark:text-red-200" data-testid="text-error">
                      <strong>Erro:</strong> {(connectionResult as ConnectionTestResult).error}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {(connectionResult as ConnectionTestResult)?.success && (connectionResult as ConnectionTestResult).data && (
          <Card>
            <CardHeader>
              <CardTitle>Informações do Banco</CardTitle>
              <CardDescription>
                Detalhes sobre as tabelas e dados disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Teste de Consulta</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm">
                      <strong>Timestamp:</strong> {(connectionResult as ConnectionTestResult).data!.test.timestamp}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Contagem de Registros por Tabela</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="count-acesso-cliente">
                        {(connectionResult as ConnectionTestResult).data!.tables.acesso_cliente.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Usuários Admin
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="count-cadastrofeed">
                        {(connectionResult as ConnectionTestResult).data!.tables.cadastrofeed.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Produtos
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400" data-testid="count-comandapedidos">
                        {(connectionResult as ConnectionTestResult).data!.tables.ComandaPedidos.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Pedidos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Sobre o Teste</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• Testa a conectividade com o servidor MySQL do InfinityFree</p>
              <p>• Verifica se as tabelas principais existem e possuem dados</p>
              <p>• Mostra informações básicas sobre o banco conectado</p>
              <p>• Útil para diagnosticar problemas de autenticação e dashboard</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}