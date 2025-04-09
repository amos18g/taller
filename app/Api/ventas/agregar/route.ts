// app/api/ventas/procesar/route.ts
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  console.log("Endpoint: /api/ventas/agregar");
  const supabase = await createClient();

  try {
    const requestBody = await request.json();
    const { state } = requestBody;
    const { items, id_empleado, descuento, observaciones } = state;

    // 1. Procesar la venta
    const { data: ventaData, error: ventaError } = await supabase.rpc('procesar_venta', {
      data: requestBody,
    });

    if (ventaError) {
      console.error('Error en procesar_venta:', ventaError);
      return NextResponse.json(
        { success: false, error: ventaError.message },
        { status: 500 }
      );
    }

    // 2. Verificar el éxito de la venta
    if (!ventaData?.success) {
      console.error('Error en procesar_venta (desde la función):', ventaData);
      return NextResponse.json(
        { success: false, error: ventaData?.error || 'Error desconocido en procesar_venta' },
        { status: 500 }
      );
    }

    const { venta_id, total } = ventaData;

    console.log("Venta_id primera prueba", ventaData);

    // 3. Manejo del cliente
    let clienteId: number | null = null;
    let clienteInfo = null;

    if (state.cliente) {
      const { correo, identidad, nombre, rtn } = state.cliente;

      // Buscar cliente por identidad
      const { data: existingCliente, error: existingClienteError } = await supabase
        .from('cliente')
        .select('id, correo, identidad, nombre, rtn')
        .eq('identidad', identidad)
        .single();

      if (existingClienteError && existingClienteError.code !== 'PGRST116') { // No se encontró el cliente
        console.error('Error al buscar cliente existente:', existingClienteError);
        return NextResponse.json(
          { success: false, error: existingClienteError.message },
          { status: 500 }
        );
      }

      if (existingCliente) {
        clienteId = existingCliente.id;
        clienteInfo = existingCliente;
        console.log('Cliente existente:', clienteId);
      } else {
        // Insertar nuevo cliente
        const { data: newCliente, error: insertError } = await supabase
          .from('cliente')
          .insert({ correo, identidad, nombre, rtn })
          .select('id, correo, identidad, nombre, rtn')
          .single();

        if (insertError) {
          console.error('Error insertando cliente:', insertError);
          return NextResponse.json(
            { success: false, error: insertError.message },
            { status: 500 }
          );
        }

        clienteId = newCliente.id;
        clienteInfo = newCliente;
        console.log('Nuevo cliente:', clienteId);
      }
    } else if (state.id_cliente) {
      // Usar id_cliente si no hay cliente nuevo
      clienteId = state.id_cliente;

      // Obtener la información del cliente existente
      const { data: clienteData, error: clienteError } = await supabase
        .from('cliente')
        .select('id, correo, identidad, nombre, rtn')
        .eq('id', clienteId)
        .single();

      if (clienteError) {
        console.error('Error al obtener cliente existente:', clienteError);
        return NextResponse.json(
          { success: false, error: clienteError.message },
          { status: 500 }
        );
      }

      clienteInfo = clienteData; // Assign clienteData to clienteInfo
      console.log('Cliente existente obtenido, clienteId:', clienteId);
    }

    // 4. Actualizar venta con cliente_id
    if (clienteId !== null && typeof clienteId === 'number') {
      const { error: updateError } = await supabase
        .from('venta')
        .update({ id_cliente: clienteId })
        .eq('id_venta', venta_id);

      if (updateError) {
        console.error('Error actualizando venta:', updateError);
        return NextResponse.json(
          { success: false, error: updateError.message },
          { status: 500 }
        );
      }
    } else {
      console.warn('No se actualizó id_cliente (valor inválido o nulo)');
    }

    return NextResponse.json(
      { success: true, venta_id, total, cliente: clienteInfo },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error general:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}