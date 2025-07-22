import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import SalesPage from "@/pages/sales";
import ProductsPage from "@/pages/products";
import ProfitsPage from "@/pages/profits";
import ReportsPage from "@/pages/reports";
import NotFound from "@/pages/not-found";
import { useState, createContext, useContext } from "react";
import type { Cliente } from "@shared/schema";

interface AuthContextType {
  user: Cliente | null;
  setUser: (user: Cliente | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}
});

export const useAuth = () => useContext(AuthContext);

function Router() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/sales" component={SalesPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/profits" component={ProfitsPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [user, setUser] = useState<Cliente | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthContext.Provider value={{ user, setUser }}>
          <Toaster />
          <Router />
        </AuthContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
