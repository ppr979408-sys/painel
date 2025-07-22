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
import NotFound from "@/pages/not-found";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

function Router() {
  const { user } = useAuth();

  console.log("Router - user state:", user);

  if (!user) {
    console.log("Router - No user, showing LoginPage");
    return <LoginPage />;
  }

  console.log("Router - User authenticated, showing dashboard routes");
  return (
    <Switch>
      <Route path="/" component={SimpleDashboardPage} />
      <Route path="/dashboard" component={SimpleDashboardPage} />
      <Route path="/dashboard-full" component={DashboardPage} />
      <Route path="/sales" component={SalesPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/profits" component={ProfitsPage} />
      <Route path="/reports" component={ReportsPage} />
      <Route component={NotFound} />
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
