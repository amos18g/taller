"use client";
import { useState } from "react";
import { useCompras } from "@/hooks/useCompras";
import TablaCompras from "@/components/Compras/tablaCompras"; // Ahora con mayúscula
import { Space, DatePicker } from "antd";

const Compras = () => {
  const { compras, loading } = useCompras(); 
  const [filterData, setFilterData] = useState(compras || []);
  const { RangePicker } = DatePicker;

  console.log("los compras son", compras);

  return (
    <>
      <RangePicker />
      <Space size={20} direction="vertical">
        <TablaCompras data={compras} loading={loading} />
      </Space>
    </>
  );
};

export default Compras;
