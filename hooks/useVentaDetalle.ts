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

interface Ventas {
  id_venta: number;
  numero_factura: string;
  id_cliente: number;
  fecha: string;
  subtotal: number;
  total: number;
  metodo_pago: string;
  observaciones?: string;
}

//  para obtener detalles de venta
export function useVentasConDetalle(fechaInicio?: string, fechaFin?: string) {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Asegurar que error sea un string o null

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        setLoading(true);
        let url = "/Api/ventas/obtenerVentasDetalle";

        if (fechaInicio && fechaFin) {
          url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error al obtener las ventas: ${response.status}`);
        }
        const data = await response.json();
        setVentas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido"); // Manejo seguro del error
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, [fechaInicio, fechaFin]);

  return { ventas, loading, error };
}



// Definir la interfaz de la API
interface VentaAPI {
  fecha_dia: string;
  id_producto: number;
  nombre: string;
  total_cantidad: number;
  total_ventas: number;
}

export function useVentasPorDia(fecha: string | null) {
  const [ventasPorDia, setVentasPorDia] = useState<Ventas[]>([]);
  const [loadingVentasPorDia, setLoadingVentasPorDia] = useState<boolean>(false);
  const [errorVentasPorDia, setErrorVentasPorDia] = useState<string | null>(null);

  useEffect(() => {
    const fetchVentasPorDia = async () => {
      if (!fecha) {
        setVentasPorDia([]); // Si no hay fecha, vaciar el estado
        return;
      }

      try {
        setLoadingVentasPorDia(true);
        console.log(`🔍 Buscando ventas para la fecha: ${fecha}`);

        const response = await fetch(`/Api/ventas/obtenerPorDIa?fecha=${fecha}`);

        if (!response.ok) {
          throw new Error(`Error al obtener las ventas por día: ${response.status}`);
        }

        const data: VentaAPI[] = await response.json();
        console.log("📊 Datos obtenidos de la API:", data);

        if (!Array.isArray(data)) {
          setVentasPorDia([]);
          return;
        }

        // 🔹 Transformar los datos de la API a la estructura de `Ventas`
        const ventasTransformadas: Ventas[] = data.map((venta, index) => ({
          id_venta: index + 1,
          numero_factura: `FV0${index + 49}`, 
          id_cliente: 1,
          fecha: venta.fecha_dia, 
          subtotal: venta.total_ventas, 
          total: venta.total_ventas,
          metodo_pago: "Efectivo", 
          observaciones: `Producto: ${venta.nombre} - Cantidad: ${venta.total_cantidad}`,
        }));

        setVentasPorDia(ventasTransformadas);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorVentasPorDia(err.message);
        } else {
          setErrorVentasPorDia("Error desconocido");
        }
      } finally {
        setLoadingVentasPorDia(false);
      }
    };

    fetchVentasPorDia();
  }, [fecha]);

  return { ventasPorDia, loadingVentasPorDia, errorVentasPorDia };
}
