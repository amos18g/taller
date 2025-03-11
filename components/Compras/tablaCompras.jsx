import React, { useState } from "react";
import { Table, Button, message } from "antd";
import dayjs from "dayjs";
import { BlobProvider } from "@react-pdf/renderer";
import MyDocument from "../../components/Compras/Factura/Document";
import {FilePdfOutlined } from "@ant-design/icons";

const GenerarFactura = ({ record }) => {
  const [loading, setLoading] = useState(false);
  const empresa = "Mi Empresa S.A.";
  const totalGeneral = record.costo_total;

  const handleClick = () => {
    setLoading(true); // Activa el estado de carga
  };

  return (
    <>
    
      <Button type="primary" onClick={handleClick} loading={loading}>
      <  FilePdfOutlined/>
        Ver factura
      </Button>

      {/* BlobProvider que se activa solo cuando loading es true */}
      {loading && (
        <BlobProvider
          document={
            <MyDocument
              empresa={empresa}
              fecha={dayjs(record.fecha_compra).format("DD/MM/YYYY HH:mm")}
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
            return null;
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
      dataSource={data.length > 0 ? data : []} // Asegurar que no sea undefined o null
      loading={loading}
      rowKey={(record) => record.id_historial || record.id}
      scroll={{ y: 500 }} 
      locale={{ emptyText: "No hay compras en este rango de fechas" }} // Texto personalizado si no hay datos
    />
  );
};

export default TablaCompras;