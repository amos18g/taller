"use client";
import { usePrueba } from "@/hooks/usePrueba";
import TablaPrueba from "@/components/tablaPrueba";

export default function PruebaPage() {
  const { data, loading, error } = usePrueba();

  return (
    <div className="container mx-auto py-10 px-5 max-w-3xl">
      <h1 className="text-3xl font-bold mb-5 text-center">GET de Prueba</h1>
      <p className="mb-8 text-center text-gray-600">Ordenado por puntaje</p>

      {loading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {data && <TablaPrueba data={data} />}
    </div>
  );
}
