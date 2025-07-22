import { createContext, useContext, useState, ReactNode } from "react";
import type { Cliente } from "@shared/schema";

interface AuthContextType {
  user: Cliente | null;
  setUser: (user: Cliente | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Cliente | null>(null);

  console.log("AuthProvider - user state:", user);

  const value = {
    user,
    setUser: (newUser: Cliente | null) => {
      console.log("AuthProvider - setUser called with:", newUser);
      setUser(newUser);
    }
  };

  console.log("AuthProvider - providing value:", value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}