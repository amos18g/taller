import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tabla_prueba")
    .select("nombre, puntos")
    .gt("puntos", 20) // Filtra los registros con puntos mayores a 20
    .order("puntos", { ascending: false }); // Ordena de mayor a menor

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
