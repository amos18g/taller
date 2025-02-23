// Api/productos/crearNuevo
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {

  console.log("Endpoint: /Api/productos/crearNuevo");
  const supabase = await createClient();
  const {
    codigo,
    nombre,
    codigo_barras,
    id_categoria,
    id_unidad,
    costo,
    impuesto,
    precio_venta,
    stock_actual,
    stock_minimo,
    activo,
  } = await request.json();

  const { data, error } = await supabase
    .from("producto")
    .insert([
      {
        codigo,
        nombre,
        codigo_barras,
        id_categoria,
        id_unidad,
        costo,
        impuesto,
        precio_venta,
        stock_actual,
        stock_minimo,
        activo,
      },
    ])
    .select(`
      id_producto,
      codigo,
      nombre,
      costo,
      impuesto,
      precio_venta,
      stock_actual,
      categoria:categoria(id_categoria, nombre),
      unidad:unidad(id_unidad, nombre)
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}