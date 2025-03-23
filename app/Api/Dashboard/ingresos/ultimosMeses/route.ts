// API ingresos de los ultimos meses
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const hoy = new Date();
  const meses = [];

  for (let i = 0; i < 3; i++) {
    const mes = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    const mesFormateado = mes.toISOString().slice(0, 7);
    meses.push(mesFormateado);
  }

  const ingresos = await Promise.all(
    meses.map(async (mes) => {
      const { data, error } = await supabase.rpc('get_ingresos_ventas_por_mes', {
        fecha_filtro: mes,
      });

      if (error) {
        return { mes, error: error.message };
      }

      return { mes, ingreso: data };
    })
  );

  return NextResponse.json(ingresos, { status: 200 });
}