// Api/categorias/[id]
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Params {
    id: number
}

export async function DELETE(request : NextRequest, { params }: { params: Params }) {
  const supabase = await createClient();
  const { id } = params;

  const { error } = await supabase
    .from("categoria")
    .delete()
    .eq("id_categoria", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Categoría eliminada" }, { status: 200 });
}