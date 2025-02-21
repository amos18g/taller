//Api/productos/buscar/id

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "El parámetro 'id' es requerido." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("producto")
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
    `)
    .eq("id_producto", id); 
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "Producto no encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(data[0], { status: 200 });
}