"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUnidades } from "@/hooks/useUnidades";
import { useCategorias } from "@/hooks/useCategorias";
import { useProductos } from "@/hooks/useProductos";
import { v4 as uuidv4 } from "uuid";
import { Spin, Button, message } from "antd";

function AgregarProducto() {

    
  const router = useRouter();
  const generarCodigoUnico = () => uuidv4().split("-")[0];
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


  // Llamadas a los hooks para obtener unidades y categorías
  const { unidades,loading: loadingUnidades,error: errorUnidades} = useUnidades();
  const {categorias,loading: loadingCategorias,error: errorCategorias} = useCategorias();
  const { crearProducto } = useProductos();

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("guardando producto");
    try {
      await crearProducto(producto);
      message.success("Producto creado correctamente");
      router.back();
    } catch (error) {
      message.error("Error al crear el producto: " + error.message);
    }
  };

  // Asegurarse de que las unidades y categorías estén cargadas antes de renderizar
  if (loadingUnidades || loadingCategorias) {
    return (
      <div>
        <Spin></Spin>
      </div>
    );
  }

  // Manejo de errores
  if (errorUnidades) {
    return <div>Error al cargar las unidades: {errorUnidades}</div>;
  }
  if (errorCategorias) {
    return <div>Error al cargar las categorías: {errorCategorias}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
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
          <label className="block font-medium">Cantidad</label>
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
              <option
                key={categoria.id_categoria}
                value={categoria.id_categoria}
              >
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
          <Button
            color="danger"
            type="default"
            onClick={() => router.back()}
            variant="outlined"
          >
            Volver
          </Button>
         <button typeof="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Guardar
         </button>
        </div>
      </form>
    </div>
  );
}

export default AgregarProducto;
