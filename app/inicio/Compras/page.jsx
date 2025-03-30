"use client";
import { useState, useEffect } from "react";
import { useCompras } from "@/hooks/useCompras";
import TablaCompras from "@/components/Compras/tablaCompras";
import { Space, DatePicker, Button, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AgregarProducto from "../inventario/agregar/page";
import dayjs from "dayjs";
import "./compras.css";

const Compras = () => {
  const { compras, loading } = useCompras();
  const [filterData, setFilterData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { RangePicker } = DatePicker;
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal

  useEffect(() => {
    setFilterData(compras || []);
  }, [compras]);

  const handleDateChange = (dates) => {
    setHasSearched(true);
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf("day");
      const endDate = dates[1].endOf("day");

      const filteredData = compras.filter((compra) => {
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
          <Button className="btnAgregar" onClick={() => setModalVisible(true)}>
            <PlusOutlined />
            Comprar Productos
          </Button>
        </div>

        <Space size={20} direction="vertical" style={{ width: "100%" }}>
          <TablaCompras data={filterData} loading={loading} />
        </Space>
      </div>

      {/* Modal para agregar productos */}
      <Modal
        title="Agregar Producto"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null} // Quitamos los botones predeterminados del modal
      >
        <AgregarProducto onClose={() => setModalVisible(false)} />
      </Modal>
    </>
  );
};

export default Compras;
