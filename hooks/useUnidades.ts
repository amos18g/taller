"use client";
import { useEffect, useState } from "react";

interface Unidad {
  id_unidad: number;
  nombre: string;
  abreviatura: string;
  descripcion: string | null;
}

export function useUnidades() {
  const [unidades, setUnidades] = useState<Unidad[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUnidades() {
      try {
        const response = await fetch("/Api/unidades");
        if (!response.ok) throw new Error("Error al obtener las unidades");

        const result = await response.json();
        setUnidades(
          result.map((unidad: any) => ({
            ...unidad,
            descripcion: unidad.descripcion || null,
          }))
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUnidades();
  }, []);

  
  return {
    unidades,
    loading,
    error,
  };
}