// Api/categorias/buscarPorNombre

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const nombre = searchParams.get("nombre");

  if (!nombre) {
    return NextResponse.json(
      { error: "El parámetro 'nombre' es requerido." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("categoria")
    .select("*")
    .ilike("nombre", nombre); // Usamos ilike en lugar de eq

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { error: "Categoría no encontrada." },
      { status: 404 }
    );
  }

  return NextResponse.json(data[0], { status: 200 });
}