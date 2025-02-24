"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUnidades } from "@/hooks/useUnidades";
import { useCategorias } from "@/hooks/useCategorias";
import { useProductos } from "@/hooks/useProductos";
import { Spin, Button, message } from "antd";

const EditarProducto = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const { unidades, loading: loadingUnidades } = useUnidades();
  const { categorias, loading: loadingCategorias } = useCategorias();
  const { buscarProducto, editarProducto } = useProductos();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener los datos del producto cuando el componente se monte
  useEffect(() => {
    if (id) {
      buscarProducto(id)
        .then((data) => {
          setProducto(data);
          setLoading(false);
        })
        .catch(() => {
          message.error("Error al cargar el producto");
          setLoading(false);
        });
    }
  }, [id]);

  // Manejo de cambios en los campos
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editarProducto(id, producto);
      message.success("Producto editado correctamente");
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      message.error("Error al editar el producto: " + error.message);
    }
  };

  if (loading || loadingUnidades || loadingCategorias) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  if (!producto) {
    return <div className="text-center text-red-500">Producto no encontradoo</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Costo</label>
          <input
            type="number"
            name="costo"
            value={producto.costo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Precio de venta</label>
          <input
            type="number"
            name="precio_venta"
            value={producto.precio_venta}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock_actual"
            value={producto.stock_actual}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Categoría</label>
          <select
            name="id_categoria"
            value={producto.id_categoria}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Unidad</label>
          <select
            name="id_unidad"
            value={producto.id_unidad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Seleccione una unidad</option>
            {unidades.map((unidad) => (
              <option key={unidad.id_unidad} value={unidad.id_unidad}>
                {unidad.nombre} ({unidad.abreviatura})
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between mt-4">
          <Button type="default" onClick={() => router.back()}>
            Volver
          </Button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProducto;
