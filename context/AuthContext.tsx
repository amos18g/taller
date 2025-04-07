"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  isSuperAdmin: boolean | null;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isSuperAdmin: null,
  loading: true,
  error: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const validateSuperAdmin = async (userId: string) => {
      try {
        const res = await fetch(`/api/usuarios/validarSuperAdmin?id=${userId}`);
        if (!res.ok) throw new Error("Error al validar rol");
        const data = await res.json();
        setIsSuperAdmin(data.isSuperAdmin);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };

    const handleAuthChange = async (user: User | null) => {
      setUser(user);
      if (user?.id) {
        await validateSuperAdmin(user.id);
      } else {
        setIsSuperAdmin(null);
      }
      setLoading(false);
    };

    const initialCheck = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      await handleAuthChange(user);
    };

    initialCheck();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      await handleAuthChange(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSuperAdmin, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);