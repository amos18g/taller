import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET( request: NextRequest,{ params }: { params: { id: string } }) {
    
    const supabase = await createClient();

    const { id } = params;

    // Obtener todas las ventas con sus detalles usando JOIN
    const { data, error } = await supabase
        .from("venta")
        .select(`*, detalles_venta(*)`)
        .eq("id_venta", id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
