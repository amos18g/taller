// Api/productos/editar/[id]
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Params {
  id: number;
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const supabase = await createClient();
  const { id } = params;
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
    .update({
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
      fecha_modificacion: new Date().toISOString(), // Agregamos la fecha de modificación
    })
    .eq("id_producto", id)
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

  return NextResponse.json(data, { status: 200 });
}