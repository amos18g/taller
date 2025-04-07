// app/api/users/editarRol
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

const ROLES_PERMITIDOS = ['admin', 'user'];

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Obtener el ID del usuario que realiza la petición y el ID del usuario a editar del cuerpo de la solicitud
  const { id, id_editar_role, nuevoRol } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "Se requiere el ID del usuario que realiza la petición." },
      { status: 400 }
    );
  }

  if (!id_editar_role) {
    return NextResponse.json(
      { error: "Se requiere el ID del usuario a editar." },
      { status: 400 }
    );
  }

  if (!nuevoRol) {
    return NextResponse.json({ error: "Se requiere el nuevo rol." }, { status: 400 });
  }

  // Validar que el nuevo rol esté dentro de los roles permitidos
  if (!ROLES_PERMITIDOS.includes(nuevoRol)) {
    return NextResponse.json(
      { error: `El nuevo rol debe ser uno de los siguientes: ${ROLES_PERMITIDOS.join(', ')}.` },
      { status: 400 }
    );
  }

  // Función para validar si un usuario tiene el rol de super_admin
  async function isSuperAdmin(userId: string): Promise<boolean> {
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
  const esSuperAdmin = await isSuperAdmin(id);

  if (!esSuperAdmin) {
    return NextResponse.json(
      { error: "No tienes permisos de super administrador para realizar esta acción." },
      { status: 403 }
    );
  }

  // Validar si el usuario a editar NO es super_admin
  const usuarioEditarEsSuperAdmin = await isSuperAdmin(id_editar_role);

  if (usuarioEditarEsSuperAdmin) {
    return NextResponse.json(
      { error: "No se puede editar el rol de un super administrador." },
      { status: 403 }
    );
  }

  // Editar el rol del usuario
  const { error: updateError } = await supabase
    .from("user")
    .update({ role: nuevoRol })
    .eq("id", id_editar_role);

  if (updateError) {
    return NextResponse.json(
      { error: "Error al editar el rol del usuario." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Rol del usuario actualizado correctamente." }, { status: 200 });
}