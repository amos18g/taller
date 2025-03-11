import { useEffect, useState } from "react";

// Interfaz para detalles de venta
export interface DetalleVenta {
  id_detalle_venta: number;
  id_venta: number;
  id_producto: number;
  nombre: string;
  quantity: number;
  precio_venta: number;
  fecha_detalle: string;
}

// Interfaz para venta
export interface Venta {
  id_venta: number;
  numero_factura: string;
  id_cliente: number;
  id_empleado: number;
  fecha: string;
  subtotal: number;
  impuesto: number;
  descuento: number;
  total: number;
  metodo_pago: string;
  estado: string;
  observaciones: string;
  detalles_venta?: DetalleVenta[];
}

export function useVentasConDetalle(fechaInicio?: string, fechaFin?: string) {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        setLoading(true);
        let url = "/Api/ventas/obtenerVentasDetalle";

        // Si hay fechas, agregarlas como parámetros de consulta
        if (fechaInicio && fechaFin) {
          url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error al obtener las ventas: ${response.status}`);
        }
        const data = await response.json();
        setVentas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, [fechaInicio, fechaFin]); // Se ejecuta cuando cambian las fechas

  return { ventas, loading, error };
}
