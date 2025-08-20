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

  const { data: deploymentStatus, isLoading: deploymentLoading, refetch: refetchDeployment } = useQuery({
    queryKey: ['/api/deployment-status'],
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });

  const { data: databaseStatus, isLoading: databaseLoading, refetch: refetchDatabase } = useQuery({
    queryKey: ['/api/database-status'],
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchDeployment(), refetchDatabase()]);
    setIsRefreshing(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Status de Produção
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sistema configurado para InfinityFree MySQL - Pronto para Deploy
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
              disabled={deploymentLoading || databaseLoading || isRefreshing}
              size="sm"
              variant="outline"
              data-testid="button-refresh"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${(deploymentLoading || databaseLoading || isRefreshing) ? 'animate-spin' : ''}`} />
              Atualizar Status
            </Button>
          </CardHeader>
          <CardContent>
            {deploymentLoading ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Verificando status de deployment...</span>
              </div>
            ) : deploymentStatus ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {(deploymentStatus as any).deployment_ready ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Pronto para Deploy
                      </Badge>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                        Configuração Incompleta
                      </Badge>
                    </>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400" data-testid="text-deployment-message">
                  {(deploymentStatus as any).message}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Provider:</span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {(deploymentStatus as any).database_config?.provider || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {(deploymentStatus as any).database_config?.connection_type || 'N/A'}
                    </p>
                  </div>
                </div>

                {(deploymentStatus as any).deployment_notes && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Notas de Deployment:</strong>
                      <ul className="mt-2 space-y-1 list-disc list-inside">
                        {(deploymentStatus as any).deployment_notes.map((note: string, index: number) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {databaseLoading ? (
          <div className="flex items-center justify-center p-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Testando conexão com o banco...</span>
          </div>
        ) : databaseStatus ? (
          (databaseStatus as any).status === 'connection_error' ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <span>Status da Conexão MySQL</span>
                </CardTitle>
                <CardDescription>
                  Informações sobre a conexão com o banco InfinityFree
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {(databaseStatus as any).environment === 'development' ? 'Aguardando Deploy' : 'Erro de Conexão'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {(databaseStatus as any).message}
                  </p>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                      ℹ️ Como Testar no Render
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Faça deploy da aplicação no Render</li>
                      <li>• Acesse a URL do deploy + /conexao</li>
                      <li>• Verá conexão real com dados do restaurante</li>
                      <li>• Sistema funcionará 100% com MySQL InfinityFree</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (databaseStatus as ConnectionTestResult)?.success && (databaseStatus as ConnectionTestResult).data ? (
          <Card>
            <CardHeader>
              <CardTitle>Informações do Banco MySQL</CardTitle>
              <CardDescription>
                Detalhes sobre as tabelas e dados disponíveis no InfinityFree
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Conectado ao MySQL
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Host:</span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {(databaseStatus as ConnectionTestResult).host || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Database:</span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {(databaseStatus as ConnectionTestResult).database || 'N/A'}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Teste de Consulta</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-sm">
                      <strong>Timestamp:</strong> {(databaseStatus as ConnectionTestResult).data!.test.timestamp}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Contagem de Registros por Tabela</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="count-acesso-cliente">
                        {(databaseStatus as ConnectionTestResult).data!.tables.acesso_cliente.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Usuários Admin
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="count-cadastrofeed">
                        {(databaseStatus as ConnectionTestResult).data!.tables.cadastrofeed.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Produtos
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400" data-testid="count-comandapedidos">
                        {(databaseStatus as ConnectionTestResult).data!.tables.ComandaPedidos.toLocaleString()}
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
        ) : null
      ) : null}

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