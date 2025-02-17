interface TablaPruebaProps {
    data: { nombre: string; puntos: number }[];
  }
  
  function TablaPrueba({ data }: TablaPruebaProps) {
    if (!data.length) {
      return <p className="text-center text-gray-500">La tabla está vacía</p>;
    }
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b">Nombre del Jugador</th>
              <th className="py-2 px-4 border-b">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-sm font-mono text-gray-700">
                  {entry.nombre}
                </td>
                <td className="py-2 px-4 border-b text-right font-semibold">
                  {entry.puntos}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  

  export default TablaPrueba;