// Api/productos/editar/[id]

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("producto")
    .select(`
      id_producto,
      codigo,
      nombre,
      costo,
      precio_venta,
      stock_actual,
      categoria:categoria(nombre),
      unidad:unidad(nombre)
    `) ;

   // console.log(data);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
