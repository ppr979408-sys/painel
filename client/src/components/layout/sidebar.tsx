import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Percent, 
  FileText, 
  Settings,
  UtensilsCrossed
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Vendas", href: "/sales", icon: TrendingUp },
  { name: "Produtos", href: "/products", icon: Package },
  { name: "Margens", href: "/profits", icon: Percent },
  { name: "Relatórios", href: "/reports", icon: FileText },
  { name: "Configurações", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform -translate-x-full lg:translate-x-0 transition-transform duration-300">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-blue-600">
        <UtensilsCrossed className="w-6 h-6 text-white mr-2" />
        <span className="text-white text-lg font-semibold">
          {user?.nome_empresa || "Meu Restaurante"}
        </span>
      </div>
      
      {/* Navigation */}
      <nav className="mt-8">
        {navigation.map((item) => {
          const IconComponent = item.icon;
          const isActive = location === item.href || (location === "/" && item.href === "/dashboard");
          
          return (
            <Link key={item.name} href={item.href}>
              <a className={cn(
                "nav-item flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200",
                isActive && "active bg-blue-50 text-blue-600 border-r-3 border-blue-600"
              )}>
                <IconComponent className="w-5 h-5 mr-3" />
                {item.name}
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
