import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Obtener todas las ventas con sus detalles usando JOIN
  const { data, error } = await supabase
    .from("venta")
    .select(`
      *,
      detalles_venta:detalles_venta(*)
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}

