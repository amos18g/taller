"use client";
import { useEffect, useState } from "react";

interface Compra {
    id: number;
    id_producto: number;
    fecha_compra: Date;
    cantidad_comprada: number;
    costo_unitario: number;
    costo_total: number;
    impuesto_compra: number;
    numero_factura: number;
}

export function useCompras() {
    const [compras, setCompras] = useState<Compra[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function obtenerCompras() {
            setLoading(true);
            try {
                const response = await fetch("/Api/compras/obtenerTodos");

                if (!response.ok) {
                    throw new Error("Error al obtener los datos del endpoint");
                }

                const result: Compra[] = await response.json();

                // Asegurar que result es un array antes de actualizar el estado
                if (Array.isArray(result)) {
                    setCompras(result);
                } else {
                    throw new Error("El formato de los datos recibidos no es válido");
                }
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "Error desconocido";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }

        obtenerCompras();
    }, []);

    async function buscarCompra(id: number) {
        try {
          console.log("Buscando compra con id:", id);
          const response = await fetch(`/Api/compras/buscar/${id}`);
          if (!response.ok) throw new Error("Error al obtener la compra");
    
          return await response.json();
        } catch (err: any) {
          setError(err.message);
          return null;
        }
      }

    return { 
        compras, 
        buscarCompra,
        loading, 
        error };
}
