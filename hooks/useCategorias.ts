"use client";
import { useEffect, useState } from "react";

interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  fecha_creacion: string;
}

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("/Api/categorias/obtenerTodos");
        if (!response.ok) throw new Error("Error al obtener los datos");

        const result = await response.json();
        setCategorias(
          result.map((categoria: any) => ({
            ...categoria,
            descripcion: categoria.descripcion || null,
            fecha_creacion:
              categoria.fecha_creacion || new Date().toISOString(),
          }))
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  // Función para crea una categoría
  async function crearCategoria(
    nuevaCategoria: Omit<Categoria, "id_categoria" | "fecha_creacion">
  ) {
    try {
      const response = await fetch("/Api/categorias/crearNuevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaCategoria),
      });

      if (!response.ok) throw new Error("Error al crear la categoría");

      const createdCategoria = await response.json();
      setCategorias((prevCategorias) =>
        prevCategorias
          ? [...prevCategorias, createdCategoria[0]]
          : [createdCategoria[0]]
      );
      return createdCategoria[0];
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  // Función para editar una categoría
  async function actualizarCategoria(
    id: number,
    categoriaActualizada: Partial<Categoria>
  ) {
    try {
      const response = await fetch(`/Api/categorias/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoriaActualizada),
      });

      if (!response.ok) throw new Error("Error al actualizar la categoría");

      const updatedCategoria = await response.json();

      setCategorias((prevCategorias) =>
        prevCategorias
          ? prevCategorias.map((categoria) =>
              categoria.id_categoria === id ? updatedCategoria[0] : categoria
            )
          : null
      );
      return updatedCategoria[0];
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  // Función para eliminar una categoría
  async function deleteCategoria(id: number) {
    try {
      const response = await fetch(`/Api/categorias/eliminar/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar la categoría");
      }
      setCategorias((prevCategorias) =>
        prevCategorias
          ? prevCategorias.filter((cat) => cat.id_categoria !== id)
          : null
      );
      const result = await response.json();
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  // Función para buscar una categoría por nombre
  async function searchCategoria(nombre: string): Promise<Categoria> {
    if (!nombre.trim()) {
      throw new Error("El parámetro 'nombre' es requerido");
    }
    try {
      const response = await fetch(
        `/Api/categorias/buscarPorNombre?nombre=${encodeURIComponent(nombre)}`
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Error HTTP: ${response.status}`);
      }
      const result: Categoria = await response.json();
      return result;
    } catch (err: any) {
      throw new Error(err.message || "Error al buscar la categoría");
    }
  }

  return {
    categorias,
    loading,
    error,
    crearCategoria,
    actualizarCategoria,
    deleteCategoria,
    searchCategoria,
  };
}
