import { useState } from "react";

interface Venta {
    id_venta?: number;
    numero_factura: string;
    id_cliente: number;
    id_empleado?: number;
    fecha?: string;
    subtotal: number;
    impuesto: number;
    descuento?: number;
    total: number;
    metodo_pago: string;
    estado: string;
    observaciones?: string;
}

export function useVentas() {
    const [ventas, setVentas] = useState<Venta[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Obtener todas las ventas
    async function obtenerVentas() {
        setLoading(true);
        try {
            const response = await fetch("/Api/ventas/obtenerTodos");

            if (!response.ok) {
                throw new Error("Error al obtener los datos del endpoint");
            }

            const result: Venta[] = await response.json();

            if (Array.isArray(result)) {
                setVentas(result);
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

    // Buscar una venta por ID
    async function buscarVenta(id: number) {
        try {
            console.log("Buscando venta con id:", id);
            const response = await fetch(`/Api/ventas/buscar/${id}`);

            if (!response.ok) throw new Error("Error al obtener la venta");

            return await response.json();
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    }

    // Crear una nueva venta
    async function crearVenta(nuevaVenta: Venta) {
        try {
            const response = await fetch("/Api/ventas/agregar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevaVenta),
            });

            if (!response.ok) {
                throw new Error("Error al crear la venta");
            }

            const ventaCreada: Venta = await response.json();
            setVentas((prevVentas) => (prevVentas ? [...prevVentas, ventaCreada] : [ventaCreada]));
            return ventaCreada;
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    }

    return { ventas, obtenerVentas, buscarVenta, crearVenta, loading, error };
}
