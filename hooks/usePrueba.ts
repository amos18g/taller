"use client";
import { useEffect, useState } from "react";

interface TablaPrueba {
  nombre: string;
  puntos: number;
}

export function usePrueba() {
  const [data, setData] = useState<TablaPrueba[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/Api/prueba");
        if (!response.ok) throw new Error("Error fetching data");
        
        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
