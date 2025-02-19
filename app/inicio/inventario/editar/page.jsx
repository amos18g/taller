"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


const EditarProducto = () => {
   
    const searchParams = useSearchParams(); // Obtén los searchParams
    const id = searchParams.get("id");



  return (
    <div>
      <h1>Producto con id: {id}</h1>
      {/* Aquí iría el formulario para editar el producto */}
    </div>
  );
};

export default EditarProducto;
