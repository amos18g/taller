// Api/compras/obtenerTodos/route.js
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("compras")
    .select(`
      *,
      producto:producto(nombre)
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Formatear la respuesta para extraer el nombre del producto
  const formatearDatos = data.map((compra) => {
    const { producto, ...compraData } = compra;
    return {
      ...compraData,
      nombre: producto  ? producto.nombre : null, // Usando producto[0].nombre
    };
  });

  return NextResponse.json(formatearDatos, { status: 200 });
}