import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import SimpleDashboardPage from "@/pages/simple-dashboard";
import SalesPage from "@/pages/sales";
import ProductsPage from "@/pages/products";
import ProfitsPage from "@/pages/profits";
import ReportsPage from "@/pages/reports";
import ConnectionTestPage from "@/pages/ConnectionTestPage";
import DeploymentStatusPage from "@/pages/deployment-status";
import NotFound from "@/pages/not-found";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function Router() {
  const { user } = useAuth();

  console.log("Router - user state:", user);

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/conexao" component={ConnectionTestPage} />
      <Route path="/status" component={DeploymentStatusPage} />
      
      {/* Authentication guard */}
      {!user ? (
        <>
          <Route path="/" component={LoginPage} />
          <Route component={LoginPage} />
        </>
      ) : (
        <>
          <Route path="/" component={DashboardPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/dashboard-simple" component={SimpleDashboardPage} />
          <Route path="/sales" component={SalesPage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/profits" component={ProfitsPage} />
          <Route path="/reports" component={ReportsPage} />
          <Route component={NotFound} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
