// Api/categorias/buscarPorId

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
    .from("categoria")
    .select("*")
    .eq("id_categoria", id); // Usamos ilike en lugar de eq

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