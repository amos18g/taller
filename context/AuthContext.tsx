"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js"; // Importa el tipo correcto

type AuthContextType = User | null;

const AuthContext = createContext<AuthContextType>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
