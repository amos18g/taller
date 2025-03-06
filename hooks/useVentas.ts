import { useState } from "react";

interface Item {
  quantity: number;
  id_producto: number;
  nombre: string;
  precio_venta: number;
}

interface RequestData {
  state: {
    items: Item[];
    id_cliente: number;
    id_empleado: number;
    descuento?: number;
    observaciones?: string;
  };
}

interface ResponseData {
  success: boolean;
  venta_id?: number;
  total?: number;
  error?: string;
  sqlstate?: string;
}

export const useProcesarVenta = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResponseData | null>(null);

  const procesarVenta = async (requestData: RequestData): Promise<ResponseData | null> => {
    setLoading(true);
    setError(null);
    setData(null);
  
    try {
      const response = await fetch("/Api/ventas/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const responseData: ResponseData = await response.json();
  
      if (response.ok) {
        setData(responseData);
        return responseData; // Retorna los datos obtenidos
      } else {
        setError(responseData.error || "Error desconocido al procesar la venta.");
        return null; // Retorna null en caso de error
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido.";
      setError(errorMessage);
      return null; // Retorna null si ocurre un error
    } finally {
      setLoading(false);
    }
  };
  

  return { loading, error, data, procesarVenta };
};
