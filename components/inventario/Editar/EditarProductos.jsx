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
      <div>
          <label className="block font-medium">Categoría</label>
          <select
            name="id_categoria"
            value={producto.id_categoria} // El valor actual del producto
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">{producto.categoria.nombre}</option>{" "}
            {/* El valor actual se mantiene */}
            {categorias.map((categoria) => (
              <option
                key={categoria.id_categoria}
                value={categoria.id_categoria}
                disabled={!categoria.activo} // Deshabilita si la categoría está inactiva
              >
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Unidad</label>
          <select
            name="unidad"
            value={producto.unidad} // El valor actual del producto
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">{producto.unidad.nombre}</option>{" "}
            {/* El valor actual se mantiene */}
            {unidades.map((unidad) => (
              <option key={unidad.id_unidad} value={unidad.id_unidad}>
                {unidad.nombre}
              </option>
            ))}
          </select>
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
