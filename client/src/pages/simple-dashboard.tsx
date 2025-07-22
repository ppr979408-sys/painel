import { useAuth } from "@/contexts/AuthContext";

export default function SimpleDashboardPage() {
  const { user } = useAuth();
  
  console.log("SimpleDashboard - user:", user);
  
  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dashboard - {user.nome_empresa}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bem-vindo!</h3>
            <p className="text-gray-600">Usuário: {user.nome} {user.sobrenome}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Loja: {user.codigo_loja}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Vendas Hoje</h3>
            <p className="text-2xl font-bold text-green-600">R$ 1.250,00</p>
            <p className="text-sm text-gray-500">+12.5% vs ontem</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pedidos Hoje</h3>
            <p className="text-2xl font-bold text-blue-600">28</p>
            <p className="text-sm text-gray-500">+8 vs ontem</p>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistema Funcionando!</h3>
          <p className="text-gray-600">
            O login foi realizado com sucesso e o sistema está funcionando corretamente.
          </p>
        </div>
      </div>
    </div>
  );
}