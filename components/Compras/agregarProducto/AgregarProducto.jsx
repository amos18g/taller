"use client";
import { useState } from "react";
import { useUnidades } from "@/hooks/useUnidades";
import { useCategorias } from "@/hooks/useCategorias";
import { useProductos } from "@/hooks/useProductos";
import { v4 as uuidv4 } from "uuid";
import { Spin, Button, message } from "antd";

function AgregarProducto({ cerrarModal }) {
  const generarCodigoUnico = () => uuidv4().split("-")[0];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [producto, setProducto] = useState({
    codigo: generarCodigoUnico(),
    nombre: "",
    costo: "",
    precio_venta: "",
    stock_actual: "",
    id_categoria: "",
    id_unidad: "",
    codigo_barras: generarCodigoUnico(),
    impuesto: 0.15,
    stock_minimo: 10,
    activo: true,
  });

  const { unidades, loading: loadingUnidades, error: errorUnidades } = useUnidades();
  const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias();
  const { crearProducto } = useProductos();

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await crearProducto(producto);
      message.success("Producto creado correctamente");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      cerrarModal(); // Cierra el modal al guardar el producto
    } catch (error) {
      message.error("Error al crear el producto: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUnidades || loadingCategorias) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin />
      </div>
    );
  }

  return (
    <div>
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button type="default" onClick={cerrarModal} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="ml-2"
            loading={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AgregarProducto;
