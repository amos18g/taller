import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export const useValidarSuperAdmin = () => {
    const { user } = useAuth(); // Usuario actual
  const userId = user?.id;

  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("El ID de usuario es requerido");
      return;
    }

    const validarSuperAdmin = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/usuarios/validarSuperAdmin?id=${userId}`);

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Error al validar el rol de super admin");
        }

        const data = await res.json();
        setIsSuperAdmin(data.isSuperAdmin);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Ejecutar la validación si userId está presente
    validarSuperAdmin();
  }, [user]); // Dependemos de userId, se ejecuta cada vez que cambie

  return { isSuperAdmin, loading, error };
};
