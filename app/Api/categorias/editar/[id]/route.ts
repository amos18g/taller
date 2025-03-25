import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const supabase = await createClient();
  
  /// Esperar los parámetros
  const params = await context.params;
  const idNumber = Number(params.id);
  
  const { nombre, descripcion, activo } = await request.json();
  
  if (isNaN(idNumber)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from("categoria")
    .update({ nombre, descripcion, activo })
    .eq("id_categoria", idNumber)
    .select();
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data, { status: 200 });
}
