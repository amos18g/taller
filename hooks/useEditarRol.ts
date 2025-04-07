"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const useEditarRol = () => {
  const { user } = useAuth();; // Usuario actual
  const userId = user?.id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const editarRol = async (id_editar_role: string, nuevoRol: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/usuarios/editarRol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId, // el ID del que hace la petición
          id_editar_role,
          nuevoRol,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al editar el rol");
      }

      setSuccess("Rol actualizado correctamente");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    editarRol,
    loading,
    error,
    success,
  };
};
