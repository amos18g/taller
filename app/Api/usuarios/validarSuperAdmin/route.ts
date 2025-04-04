// api/usuarios/validarSuperAdmin?id= devolvera true o false dependiendo si el usuario es super_admin
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "Se requiere el parámetro 'id'" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("user")
    .select("role") // Solo necesitamos la columna 'role'
    .eq("id", userId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const isSuperAdmin = data.role === "super_admin";

  return NextResponse.json({ isSuperAdmin }, { status: 200 });
}