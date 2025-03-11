import React, { useState } from "react";
import { Table, Button, } from "antd";
import { pdf } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { useVentasConDetalle } from "@/hooks/useVentaDetalle";
import VentaDetalleModal from "./DetalleVenta";
import FacturaPDF from "./FacturaVentas";
import {FilePdfOutlined, EyeOutlined } from "@ant-design/icons";

export default function VentasTable() {
  const { ventas, loading, error } = useVentasConDetalle();

  // Estados para el modal
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Función para generar el PDF y abrirlo en una nueva pestaña
  const handleOpenFactura = async (record) => {
    try {
      const blob = await pdf(<FacturaPDF venta={record} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error("Error al generar la factura:", err);
    }
  };

  const columns = [
    {
      title: "Número Factura",
      dataIndex: "numero_factura",
      key: "numero_factura",
      width: 200,
    },
    { 
      title: "ID Cliente", 
      dataIndex: "id_cliente", 
      key: "id_cliente", 
      width: 100,
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (fecha) => dayjs(fecha).format("DD/MM/YYYY hh:mm a"),
      width: 600,
    },
    { 
      title: "Subtotal", 
      dataIndex: "subtotal", 
      key: "subtotal",
      width: 100, 
    },
    { 
      title: "Total", 
      dataIndex: "total", 
      key: "total",
      width: 100, 
    },
    { 
      title: "Método de Pago", 
      dataIndex: "metodo_pago", 
      key: "metodo_pago",
      width: 500, 
    },
    {
      title: "Observaciones",
      dataIndex: "observaciones",
      key: "observaciones",
      width: 800,
    },
    {
      title: "Detalle",
      key: "accion",
      render: (_, record) => (
        <Button
          onClick={() => {
            setSelectedVenta(record);
            setModalVisible(true);
          }}
        >
          <EyeOutlined />
          Ver Detalle
        </Button>
      ),
      width: 100,
    },
    {
      title: "Factura",
      key: "factura",
      render: (_, record) => (
        <Button  type="primary" onClick={() => handleOpenFactura(record)}>
          <FilePdfOutlined />
          Ver Factura
        </Button>
      ),
      width: 100,
    },
  ];

  if (loading) return <div>Cargando ventas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Table
        dataSource={ventas}
        columns={columns}
        rowKey="id_venta"
        pagination={{ pageSize: 8 }}
      />
      <VentaDetalleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        venta={selectedVenta}
      />
    </>
  );
}
