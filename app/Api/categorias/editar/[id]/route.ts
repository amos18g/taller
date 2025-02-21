// Api/categorias/editar/[id]
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Params {
  id: number; 
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const supabase = await createClient();
  const { id } = params;
  const { nombre, descripcion, activo } = await request.json();

  const { data, error } = await supabase
    .from("categoria")
    .update({ nombre, descripcion, activo })
    .eq("id_categoria", id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}