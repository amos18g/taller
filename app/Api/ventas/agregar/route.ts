// app/api/ventas/procesar/route.ts
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  console.log("Endpoint: /api/ventas/agregar");
  const supabase = await createClient();
  
  try {
    const requestBody = await request.json();
    
    const { data, error } = await supabase.rpc('procesar_venta', {
      data: requestBody
    });

    if (error) {
      console.error('Error en RPC:', error);
      return NextResponse.json(
        { success: false, error: error.message }, 
        { status: 500 }
      );
    }

    if (data?.success) {
      return NextResponse.json({
        success: true,
        venta_id: data.venta_id,
        total: data.total
      }, { status: 201 });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: data?.error || 'Error desconocido',
          sqlstate: data?.sqlstate 
        }, 
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error general:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}