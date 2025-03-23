// app/api/ventas/delDia?fecha=2025-03-06
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const fecha = searchParams.get("fecha");

  if (!fecha) {
    return NextResponse.json({ error: "Se requiere el parámetro 'fecha'" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('get_cantidad_factura_ventas_dia', {
    fecha_filtro: fecha,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ cantidad: data }, { status: 200 });
}