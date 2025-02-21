// Api/categorias/crearNuevo
import { NextResponse, NextRequest  } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { nombre, descripcion, activo } = await request.json();

  const { data, error } = await supabase
    .from("categoria")
    .insert([{ nombre, descripcion, activo }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 }); // 201 Created
}