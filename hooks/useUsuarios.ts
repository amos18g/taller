"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UseUsuariosResult {
  usuarios: Usuario[] | null;
  loading: boolean;
  error: string | null;
}

export const useUsuarios = (): UseUsuariosResult => {
  // Mover useAuth dentro del hook
  const {user} = useAuth();
  const userId = user?.id;

  const [usuarios, setUsuarios] = useState<Usuario[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUsuarios = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/usuarios/getUsuarios?id=${userId}`);
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Error al obtener los usuarios");
        }

        const data = await res.json();
        setUsuarios(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [userId]); 

  return { usuarios, loading, error };
};