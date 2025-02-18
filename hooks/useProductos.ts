"use client";
import { useEffect, useState } from "react";

interface Producto {
  id_producto: number;
  nombre: string;
  precio_venta: number;
  stock_actual: number;
  categoria: string;
  unidad: string;
}

export function useProductos() {
  const [data, setData] = useState<Producto[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch("/Api/productos");
        if (!response.ok) throw new Error("Error al obtener los datos");
        
        const result = await response.json();
        setData(result.map((producto: any) => ({
          ...producto,
          categoria: producto.Categoria?.nombre || "Sin Categoría",
          unidad: producto.Unidad?.nombre || "Sin Unidad"
        })));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductos();
  }, []);

  return { data, loading, error };
}
