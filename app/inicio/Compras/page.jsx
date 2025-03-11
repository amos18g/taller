"use client";
import { useState, useEffect } from "react";
import { useCompras } from "@/hooks/useCompras";
import TablaCompras from "@/components/Compras/tablaCompras";
import { Space, DatePicker, Empty, Button, Spin } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import "./compras.css";
import { PlusOutlined } from "@ant-design/icons";

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
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Compras</h1>
        <div className="compra-encabezado">
          <RangePicker onChange={handleDateChange} />

          <Link href="/inicio/inventario/agregar">
            <Button className="btnAgregar">
              <PlusOutlined />
              Comprar Productos</Button>
          </Link>
        </div>

        <Space size={20} direction="vertical" style={{ width: '100%' }}>
          {loading ? (

            <Spin />
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
      </div>
    </>
  );
};

export default Compras;