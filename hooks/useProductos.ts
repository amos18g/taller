"use client";
import { useEffect, useState } from "react";

interface Producto {
  id_producto: number;
  nombre: string;
  costo: number;
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
    fetchProductos();
  }, []);

  //Obtiene todos los productos
  async function fetchProductos() {
    setLoading(true);
    try {
      const response = await fetch("/Api/productos");
      if (!response.ok) throw new Error("Error al obtener los datos");

      const result = await response.json();

      setData(
        result.map((producto: any) => ({
          ...producto,
          categoria: producto.categoria?.nombre || "Sin Categoría",
          unidad: producto.unidad?.nombre || "Sin Unidad",
          costo: producto.costo || 0,
        }))
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function buscarProducto(id: number) {
    try {
      console.log("Buscando producto con id:", id);
      const response = await fetch(`/Api/productos/buscar/${id}`);
      if (!response.ok) throw new Error("Error al obtener el producto");

      return await response.json();
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  }

  async function crearProducto(producto: Omit<Producto, "id_producto">) {
    try {
      console.log("Enviando producto:", producto);
      const response = await fetch("/Api/productos/crearNuevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      console.log("Respuesta status:", response.status);
      const data = await response.json();
      console.log("Respuesta data:", data);
      
      if (!response.ok) throw new Error(data.error || "Error al crear el producto");
      
      await fetchProductos();
      return data;
    } catch (err) {
      console.error("Error en crearProducto:", err);
      throw err;
    }
  }

  async function editarProducto(id: number, producto: Partial<Producto>) {
    try {
      const response = await fetch(`/Api/productos/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!response.ok) throw new Error("Error al editar el producto");

      await fetchProductos();
    } catch (err: any) {
      setError(err.message);
    }
  }

  
  async function eliminarProducto(id: number) {
    try {
      const response = await fetch(`/Api/productos/eliminar/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el producto");

      await fetchProductos();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return {
    data,
    loading,
    error,
    buscarProducto,
    crearProducto,
    editarProducto,
    eliminarProducto,
  };
}
