import React, { useState } from "react";
import { Table, Button, DatePicker } from "antd";
import { pdf } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { useVentasConDetalle, useVentasPorDia } from "@/hooks/useVentaDetalle";
import VentaDetalleModal from "./DetalleVenta";
import FacturaPDF from "./FacturaVentas";
import { FilePdfOutlined, EyeOutlined } from "@ant-design/icons";

export default function VentasTable() {
  const { ventas, loading, error } = useVentasConDetalle();

  // Estado para buscar ventas por día
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const { ventasPorDia, loadingVentasPorDia, errorVentasPorDia } = useVentasPorDia(fechaSeleccionada || "");

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

  // Manejar cambio de fecha en el DatePicker
  const handleDateChange = (date, dateString) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      console.log(`📅 Fecha seleccionada en DatePicker: ${formattedDate}`);
      setFechaSeleccionada(formattedDate);
    } else {
      setFechaSeleccionada(null);
    }
  };

  const columns = [
    { title: "Número Factura", dataIndex: "numero_factura", key: "numero_factura", width: 80 },
    { title: "Fecha", dataIndex: "fecha", key: "fecha", render: (fecha) => dayjs(fecha).format("DD/MM/YYYY hh:mm a"), width: 100 },
    { title: "Subtotal", dataIndex: "subtotal", key: "subtotal", width: 55 },
    { title: "Total", dataIndex: "total", key: "total", width: 55 },
    { title: "Método de Pago", dataIndex: "metodo_pago", key: "metodo_pago", width: 85 },
    { title: "Observaciones", dataIndex: "observaciones", key: "observaciones", width: 110 },
    {
      title: "Detalle",
      key: "accion",
      render: (_, record) => (
        <Button onClick={() => { setSelectedVenta(record); setModalVisible(true); }}>
          <EyeOutlined />
          Ver Detalle
        </Button>
      ),
      width: 80,
    },
    {
      title: "Factura",
      key: "factura",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleOpenFactura(record)}>
          <FilePdfOutlined />
          Ver Factura
        </Button>
      ),
      width: 80,
    },
  ];

  return (
    <>
      {/* Selector de Fecha */}
      <DatePicker onChange={handleDateChange} style={{ marginBottom: 16 }} />

      {/* Mostrar solo ventas correctas */}
      {fechaSeleccionada ? (
        loadingVentasPorDia ? (
          <p className="text-gray-500 text-center">Cargando ventas...</p>
        ) : ventasPorDia.length === 0 ? (
          <p className="text-gray-500 text-center">No hay ventas registradas para esta fecha.</p>
        ) : (
          <Table
            dataSource={ventasPorDia}
            columns={columns}
            loading={loadingVentasPorDia}
            rowKey="id_venta"
            pagination={{ pageSize: 8 }}
          />
        )
      ) : (
        <Table
          dataSource={ventas}
          columns={columns}
          rowKey="id_venta"
          loading={loading}
          scroll={{
            y: 500, 
          }}
        />
      )}

      <VentaDetalleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        venta={selectedVenta}
      />
    </>
  );
}