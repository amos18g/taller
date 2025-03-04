// Api/compras/id

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const id = params.id;
  console.log("El id de la compra es:", id);



  const { data, error } = await supabase
    .from("compras")
    .select("*")
    .eq("id_historial", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
