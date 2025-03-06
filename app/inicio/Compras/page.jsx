"use client";
import { useState, useEffect } from "react";
import { useCompras } from "@/hooks/useCompras";
import TablaCompras from "@/components/Compras/tablaCompras";
import { Space, DatePicker, Empty } from "antd";
import dayjs from "dayjs";

const Compras = () => {
  const { compras, loading } = useCompras();
  const [filterData, setFilterData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Añadimos este estado
  const { RangePicker } = DatePicker;

  // Actualiza filterData cuando compras cambie
  useEffect(() => {
    setFilterData(compras || []);
  }, [compras]);

  const handleDateChange = (dates) => {
    setHasSearched(true); // Marcamos que se ha realizado una búsqueda
    
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf('day');
      const endDate = dates[1].endOf('day');

      const filteredData = compras.filter(compra => {
        const fechaCompra = dayjs(compra.fecha_compra);
        return fechaCompra.isAfter(startDate) && fechaCompra.isBefore(endDate);
      });

      setFilterData(filteredData);
    } else {
      setFilterData(compras || []);
    }
  };

  return (
    <>
      <RangePicker onChange={handleDateChange} />
      <Space size={20} direction="vertical" style={{ width: '100%' }}>
        {loading ? (
          // Mientras está cargando, muestra la tabla con el estado de carga
          <TablaCompras data={[]} loading={true} />
        ) : (hasSearched && filterData.length === 0) ? (
          // Solo muestra "No hay datos" si se ha realizado una búsqueda y no hay resultados
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Empty 
              description="No hay datos para el rango de fechas seleccionado" 
              image={Empty.PRESENTED_IMAGE_SIMPLE} 
            />
          </div>
        ) : (
          // Muestra la tabla normal con los datos disponibles
          <TablaCompras data={filterData} loading={loading} />
        )}
      </Space>
    </>
  );
};

export default Compras;