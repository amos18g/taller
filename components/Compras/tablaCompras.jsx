"use client";
import { Table, Button } from "antd";
import dayjs from "dayjs";
import DetalleCompra from "./DetalleCompra";

const TablaCompras = ({ data = [], loading }) => { // Desestructurar correctamente
  
    const mostrarFactura = (record) => {
    DetalleCompra(record);
  };

  const columns = [
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
      width: 150,
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
      render: (_, record) => (
        <Button color="primary" onClick={() => mostrarFactura(record)}>
          Ver factura
        </Button>
      ),
      width: 100,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data || []} // Evitar "undefined"
      loading={loading}
      rowKey={(record) => record.id_historial || record.id} // Usar "id" si "id_historial" no existe
      scroll={{ y: 400 }}
      locale={{ emptyText: "No hay datos que coincidan con su búsqueda" }}
    />
  );
};

export default TablaCompras;
