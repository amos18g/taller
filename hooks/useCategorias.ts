"use client";
import { useEffect, useState } from "react";

interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  fecha_creacion: string;
}

//Obtiene todas las categorias
export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[] | null>(null);  // Cambiado 'data' por 'categorias'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todas las categorías
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await fetch("/Api/categorias/obtenerTodos");
        if (!response.ok) throw new Error("Error al obtener los datos");

        const result = await response.json();
        //console.log(result);

        setCategorias(result.map((categoria: any) => ({
          ...categoria,
          descripcion: categoria.descripcion || null,
          fecha_creacion: categoria.fecha_creacion || new Date().toISOString()
        })));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorias();
  }, []);

  // Crear una nueva categoría
  async function crearCategoria(nuevaCategoria: Omit<Categoria, 'id_categoria' | 'fecha_creacion'>) {
    try {
      const response = await fetch("/Api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaCategoria)
      });

      if (!response.ok) throw new Error("Error al crear la categoría");

      const createdCategoria = await response.json();
      setCategorias((prevCategorias) => prevCategorias ? [...prevCategorias, createdCategoria] : [createdCategoria]);
    } catch (err: any) {
      setError(err.message);
    }
  }

  // Actualizar una categoría
  async function actualizarCategoria(id: number, categoriaActualizada: Partial<Categoria>) {
    try {
      const response = await fetch(`/Api/categorias/editar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(categoriaActualizada)
      });

      if (!response.ok) throw new Error("Error al actualizar la categoría");

      const updatedCategoria = await response.json();
      setCategorias((prevCategorias) => prevCategorias ? prevCategorias.map((categoria) => 
        categoria.id_categoria === id ? updatedCategoria : categoria
      ) : null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  // Eliminar una categoría
  async function eliminarCategoria(id: number) {
    try {
      const response = await fetch(`/Api/categorias/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar la categoría");

      setCategorias((prevCategorias) => prevCategorias ? prevCategorias.filter((categoria) => categoria.id_categoria !== id) : null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return { categorias, loading, error, crearCategoria, actualizarCategoria, eliminarCategoria }; 
}
