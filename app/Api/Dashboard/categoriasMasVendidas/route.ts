// app/api/ventas/categoriasMasVendidas
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const limite = searchParams.get("limite");

  if (!limite) {
    return NextResponse.json({ error: "Se requiere el parámetro 'limite'" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('get_categorias_mas_vendidas', {
    limite: parseInt(limite),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}