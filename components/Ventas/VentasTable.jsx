import React, { useState } from "react";
import { Table, Button, DatePicker, Radio, message, Empty } from "antd";
import { pdf } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { useVentasConDetalle } from "@/hooks/useVentaDetalle";
import VentaDetalleModal from "./DetalleVenta";
import FacturaPDF from "./FacturaVentas";
import { FilePdfOutlined, EyeOutlined } from "@ant-design/icons";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

export default function VentasTable() {
  const { ventas, loading } = useVentasConDetalle();

  const [selectedVenta, setSelectedVenta] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [modoBusqueda, setModoBusqueda] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [rangoFechas, setRangoFechas] = useState([]);

  // Generar PDF de factura
  const handleOpenFactura = async (record) => {
    try {
      const blob = await pdf(<FacturaPDF venta={record} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error("Error al generar la factura:", err);
      message.error("Error al generar la factura.");
    }
  };

  // Columnas de la tabla
  const columns = [
    {
      title: "Número Factura",
      dataIndex: "numero_factura",
      key: "numero_factura",
      width: 130,
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (fecha) => dayjs(fecha).format("DD/MM/YYYY"),
      width: 100,
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (value) => `L.${value.toFixed(2)}`,
      width: 70,
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (value) => `L.${value.toFixed(2)}`,
      key: "total",
      width: 70,
    },
    {
      title: "Método de Pago",
      dataIndex: "metodo_pago",
      key: "metodo_pago",
      width: 135,
    },
    {
      title: "Observaciones",
      dataIndex: "observaciones",
      key: "observaciones",
      width: 200,
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
          <EyeOutlined /> Ver Detalle
        </Button>
      ),
      width: 50,
    },
    {
      title: "Factura",
      key: "factura",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleOpenFactura(record)}>
          <FilePdfOutlined /> Ver Factura
        </Button>
      ),
      width: 50,
    },
  ];

  // Filtrar ventas según el modo

  const filtrarVentas = () => {
    if (!ventas) return [];

    if (modoBusqueda === "dia" && fechaSeleccionada) {
      return ventas.filter((venta) =>
        dayjs(venta.fecha).isSame(fechaSeleccionada, "day")
      );
    }

    if (modoBusqueda === "rango" && rangoFechas && rangoFechas.length === 2) {
      const inicio = dayjs(rangoFechas[0]);
      const fin = dayjs(rangoFechas[1]);
      return ventas.filter(
        (v) => dayjs(v.fecha).isBetween(inicio, fin, null, "[]")
      );
    }

    if (modoBusqueda === "mes" && fechaSeleccionada) {
      return ventas.filter((venta) =>
        dayjs(venta.fecha).isSame(fechaSeleccionada, "month")
      );
    }
    return ventas;
  };

  return (
    <>
      {/* Tipo de búsqueda */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <span className="font-semibold">Filtrar ventas por:</span>
        <Radio.Group
          onChange={(e) => {
            setModoBusqueda(e.target.value);
            setFechaSeleccionada(null);
            setRangoFechas([]);
          }}
          value={modoBusqueda}
        >
          <Radio.Button value="dia" style={{ width: 120, textAlign: "center" }}>Por Día</Radio.Button>
          <Radio.Button value="rango" style={{ width: 120, textAlign: "center" }}>Por Rango</Radio.Button>
          <Radio.Button value="mes" style={{ width: 120, textAlign: "center" }}>Por Mes</Radio.Button>
        </Radio.Group>

        {modoBusqueda === "dia" && (
          <DatePicker onChange={(value) => setFechaSeleccionada(value)} style={{ width: "300px" }} placeholder="Seleccione la fecha" />
        )}
        {modoBusqueda === "rango" && (
          <RangePicker onChange={(values) => setRangoFechas(values)} style={{ width: "300px" }} placeholder={["Fecha inicio", "Fecha fin"]} />
        )}
        {modoBusqueda === "mes" && (
          <DatePicker picker="month" onChange={(value) => setFechaSeleccionada(value)} style={{ width: "300px" }} placeholder="Seleccione el mes" />
        )}
      </div>
      {!loading && filtrarVentas().length === 0 ? (
        <div style={{ width: "1140px", padding: "2rem 0" }}>
          <Empty
            description="No hay ventas disponibles"
            imageStyle={{ height: 60 }}
          />
        </div>
      ) : (
        <div className="max-w-full overflow-x-auto">
  <Table
    dataSource={filtrarVentas()}
    columns={columns}
    loading={loading}
    rowKey="id_venta"
    pagination={{ pageSize: 8 }}
    scroll={{ x: true, y: 500 }}
  />
</div>
      )}
      {/* Modal de detalle */}
      <VentaDetalleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        venta={selectedVenta}
      />
    </>
  );
}