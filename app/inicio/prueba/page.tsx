

import { createClient } from '@/utils/supabase/server'; // Importa el cliente Supabase del servidor
import { notFound } from 'next/navigation';

interface TablaPrueba {
    nombre: string; // Usamos 'nombre' en lugar de 'user_id'
    puntos: number; // Usamos 'puntos' en lugar de 'score'
}

export default async function getPruebaPagina() {
    const supabase = await createClient(); // Crea el cliente Supabase del servidor

    const { data: dataDePrueba, error: dataDePruebaError } = await supabase
        .from('tabla_prueba') // *** ¡REEMPLAZA 'nombre_de_tu_tabla' CON EL NOMBRE REAL DE TU TABLA! ***
        .select('nombre, puntos')     // Selecciona 'nombre' y 'puntos'
        .order('puntos', { ascending: false }) // Ordena por 'puntos' de mayor a menor (opcional)

        console.log("datos traidos: ", JSON.stringify(dataDePrueba))

    if (dataDePruebaError) {
        console.error("Error fetching game leaderboard data:", dataDePruebaError);
        return <div>Error loading game leaderboard data. Please try again later.</div>;
    }

    if (!dataDePrueba) {
        return <div>No game leaderboard data available.</div>;
    }

    return (
        <div className="container mx-auto py-10 px-5 max-w-3xl">
            <h1 className="text-3xl font-bold mb-5 text-center">get de Prueba</h1>
            <p className="mb-8 text-center text-gray-600">Ordenado por puntaje</p>

            {dataDePrueba.length === 0 ? (
                <p className="text-center text-gray-500">La tabla se encuentra vacia</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 shadow-md rounded-md">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-2 px-4 border-b">Nombre del Jugador</th> {/* Cambiado a 'Nombre del Jugador' */}
                                <th className="py-2 px-4 border-b">Puntos</th>          {/* Cambiado a 'Puntos' */}
                            </tr>
                        </thead>
                        <tbody>
                            {dataDePrueba.map((entry: TablaPrueba, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-sm font-mono text-gray-700">{entry.nombre}</td> {/* Muestra 'nombre' */}
                                    <td className="py-2 px-4 border-b text-right font-semibold">{entry.puntos}</td>        {/* Muestra 'puntos' */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}