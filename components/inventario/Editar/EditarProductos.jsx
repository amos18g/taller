"use client";

import { useState, useEffect } from "react";
import { message, Button } from "antd";
import { useUnidades } from "@/hooks/useUnidades";
import { useCategorias } from "@/hooks/useCategorias";


const EditarProducto = ({ producto, onClose, editarProducto }) => {
  const { unidades, loading: loadingUnidades } = useUnidades();
  const { categorias, loading: loadingCategorias } = useCategorias();

  const [productoEditado, setProductoEditado] = useState(producto);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setProductoEditado(producto);
  }, [producto]);

  const handleChange = (e) => {
    setProductoEditado({ ...productoEditado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await editarProducto(productoEditado.id_producto, productoEditado);
      message.success("Producto editado correctamente");
      onClose();
    } catch (error) {
      message.error("Error al editar el producto: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUnidades || loadingCategorias) {
    return <p>Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={productoEditado.nombre}
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
          value={productoEditado.costo}
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
          value={productoEditado.precio_venta}
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
          value={productoEditado.stock_actual}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="flex justify-between mt-4">
        <Button type="default" onClick={onClose} disabled={isSubmitting}>
          Volver
        </Button>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
};

export default EditarProducto;
