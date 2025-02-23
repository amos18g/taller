"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUnidades } from "@/hooks/useUnidades";
import { useCategorias } from "@/hooks/useCategorias";
import { useProductos } from "@/hooks/useProductos";
import { Spin, Button } from "antd";

function AgregarProducto() {
  const router = useRouter();
  const [producto, setProducto] = useState({
    nombre: "",
    precio_venta: "",
    stock_actual: "",
    categoria: "",
    unidad: "",
  });

  // Llamadas a los hooks para obtener unidades y categorías
  const { unidades, loading: loadingUnidades, error: errorUnidades } = useUnidades();
  const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias();
  const{ crearProducto} = useProductos();

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto agregado:", producto);
    // Aquí puedes hacer una petición a la API para guardar el producto
  };

  // Asegurarse de que las unidades y categorías estén cargadas antes de renderizar
  if (loadingUnidades || loadingCategorias) {
    return <div><Spin></Spin></div>; 
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
          <label className="block font-medium">Precio</label>
          <input
            type="number"
            name="precio_venta"
            value={producto.precio_venta}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            step="0.01"
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
            name="categoria"
            value={producto.categoria}
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
            name="unidad"
            value={producto.unidad}
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
          <Button
            type="primary"
            htmlType="submit"
            variant="solid"
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AgregarProducto;
