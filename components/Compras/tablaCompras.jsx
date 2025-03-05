import React, { useState } from "react";
import { Table, Button, message } from "antd";
import dayjs from "dayjs";
import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "../../components/Compras/Factura/Document";

const GenerarFactura = ({ record }) => {
  const [loading, setLoading] = useState(false);
  const empresa = "Mi Empresa S.A.";
  const totalGeneral = record.costo_total;

  const handleClick = () => {
    setLoading(true); // Activa el estado de carga
  };

  return (
    <>
      {/* Botón que siempre se muestra */}
      <Button onClick={handleClick} loading={loading}>
        Ver factura
      </Button>

      {/* BlobProvider que se activa solo cuando loading es true */}
      {loading && (
        <BlobProvider
          document={
            <MyDocument
              empresa={empresa}
              fecha={record.fecha_compra}
              totalGeneral={totalGeneral}
              comprasData={[record]}
            />
          }
        >
          {({ blob, url, loading: pdfLoading }) => {
            if (url && !pdfLoading) {
              window.open(url, "_blank"); // Abre el PDF en una nueva pestaña
              setLoading(false); // Reinicia el estado de carga
            }
            return null; // No renderiza nada en el DOM
          }}
        </BlobProvider>
      )}
    </>
  );
};

const TablaCompras = ({ data = [], loading }) => {
  const columns = [

    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
      width: 150,
    },
    {
      title: "Fecha de la compra",
      dataIndex: "fecha_compra",
      key: "fecha_compra",
      render: (fecha) => dayjs(fecha).format("DD/MM/YYYY HH:mm"),
      width: 150,
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad_comprada",
      key: "cantidad_comprada",
      align: "center",
      width: 150,
    },
    {
      title: "Costo Unitario",
      dataIndex: "costo_unitario",
      key: "costo_unitario",
      width: 100,
      align: "center",
    },
    {
      title: "Costo Total",
      dataIndex: "costo_total",
      key: "costo_total",
      align: "center",
      width: 150,
    },
    {
      title: "Factura",
      key: "factura",
      render: (_, record) => <GenerarFactura record={record} />,
      width: 150,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      loading={loading}
      rowKey={(record) => record.id_historial || record.id}
      scroll={{ y: 400 }}
      locale={{ emptyText: "No hay datos que coincidan con su búsqueda" }}
    />
  );
};

export default TablaCompras;