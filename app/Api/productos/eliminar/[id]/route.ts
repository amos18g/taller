import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Params {
  id: string;
}

export async function DELETE(request: NextRequest, { params }: { params: Params }) {

  const { id } = await params;

  console.log("elimando producto con id:",id);
  
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("producto")
    .delete()
    .eq("id_producto", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Producto eliminado" }, { status: 200 });
}
