import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertTriangle, Database, Cloud, Server } from "lucide-react";

interface DeploymentStatusResponse {
  deployment_ready: boolean;
  message: string;
  environment_variables: Record<string, string>;
  database_config: {
    provider: string;
    host: string;
    database: string;
    connection_type: string;
  };
  deployment_notes: string[];
}

export default function DeploymentStatusPage() {
  const { data: deploymentStatus, isLoading } = useQuery({
    queryKey: ['/api/deployment-status'],
    retry: false,
  });

  const status = deploymentStatus as DeploymentStatusResponse;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Status de Deploy - Sistema InfinityFree
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Verificação completa de configuração para produção
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Status Principal */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                {status?.deployment_ready ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <CardTitle className="text-green-800 dark:text-green-200">
                        Sistema Pronto para Deploy
                      </CardTitle>
                      <CardDescription>
                        Todas as configurações estão corretas
                      </CardDescription>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                    <div>
                      <CardTitle className="text-orange-800 dark:text-orange-200">
                        Configurações Pendentes
                      </CardTitle>
                      <CardDescription>
                        Algumas configurações precisam ser ajustadas
                      </CardDescription>
                    </div>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {status?.message}
              </p>
            </CardContent>
          </Card>

          {/* Configuração do Banco de Dados */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-blue-600" />
                <CardTitle>Configuração do Banco de Dados</CardTitle>
              </div>
              <CardDescription>
                InfinityFree MySQL - Configuração de Produção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Provider</span>
                  <p className="text-lg font-semibold">{status?.database_config?.provider}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tipo de Conexão</span>
                  <p className="text-lg font-semibold">{status?.database_config?.connection_type}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Host</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{status?.database_config?.host}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Database</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{status?.database_config?.database}</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h4 className="font-medium mb-3">Variáveis de Ambiente</h4>
                <div className="space-y-2">
                  {status?.environment_variables && Object.entries(status.environment_variables).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-sm font-medium">{key}</span>
                      <Badge variant={value.includes('✅') ? 'secondary' : 'destructive'} className="text-xs">
                        {value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notas de Deploy */}
          {status?.deployment_notes && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5 text-purple-600" />
                  <CardTitle>Notas de Deployment</CardTitle>
                </div>
                <CardDescription>
                  Informações importantes sobre o processo de deploy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {status.deployment_notes.map((note, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Próximos Passos */}
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-green-600" />
                <CardTitle className="text-green-800 dark:text-green-200">Próximos Passos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Sistema configurado para InfinityFree MySQL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Credenciais de produção configuradas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Interface de login funcionando em modo demo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Clique no botão <strong>Deploy</strong> para ativar MySQL em produção</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}