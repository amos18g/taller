// app/api/usuarios/getUsuarios/route.ts
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const requestingUserId = searchParams.get("id");

  if (!requestingUserId) {
    return NextResponse.json(
      { error: "Se requiere el parámetro 'id' del usuario que realiza la petición." },
      { status: 400 }
    );
  }

  // Función para validar si el usuario que realiza la petición tiene el rol de super_admin
  async function esSu(userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("user")
      .select("role")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return false;
    }
    return data.role === "super_admin";
  }

  // Validar si el usuario que realiza la petición es super_admin
  const esSuperAdmin = await esSu(requestingUserId);

  if (!esSuperAdmin) {
    return NextResponse.json(
      { error: "No tienes permisos de super administrador para realizar esta acción." },
      { status: 403 }
    );
  }

  // Si el usuario que realiza la petición es super_admin, obtener todos los usuarios excepto los super_admin
  const { data: users, error: usersError } = await supabase
    .from("user")
    .select("*")
    .neq("role", "super_admin");

  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  return NextResponse.json(users, { status: 200 });
}