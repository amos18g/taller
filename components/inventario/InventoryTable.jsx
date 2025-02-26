"use client";
import { Table, Button, Tag, Popconfirm, message } from "antd";
import { useRouter } from "next/navigation";
import styles from "../../styles/inventario.module.css";

const InventoryTable = ({ data, loading, eliminarProducto }) => {
  const router = useRouter();

  const handleEdit = (record) => {
    router.push(`/inicio/inventario/editar?id=${record.id_producto}`);
  };

  const handleDeleteProduct = async (record) => {
    try {
      await eliminarProducto(record.id_producto);
      message.success("Producto eliminado correctamente");
    } catch (error) {
      message.error("Error al eliminar el producto");
    }
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
    },
    {
      title: "Costo",
      dataIndex: "costo",
      key: "costo",
      render: (value) => `$${value.toFixed(2)}`,
      sorter: (a, b) => a.costo - b.costo,
    },
    {
      title: "Precio de venta",
      dataIndex: "precio_venta",
      key: "precio_venta",
      render: (value) => `$${value.toFixed(2)}`,
      sorter: (a, b) => a.precio_venta - b.precio_venta,
    },
    {
      title: "Cantidad",
      dataIndex: "stock_actual",
      key: "stock_actual",
      render: (stock) => (
        <Tag color={stock < 20 ? "volcano" : "green"}>{stock}</Tag>
      ),
      sorter: (a, b) => a.stock_actual - b.stock_actual,
    },
    { title: "Categoría", dataIndex: "categoria", key: "categoria" },
    { title: "Unidad", dataIndex: "unidad", key: "unidad" },
    {
      title: "Editar",
      key: "editar",
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)}>Editar</Button>
      ),
    },
    {
      title: "Eliminar",
      key: "eliminar",
      render: (_, record) => (
        <Popconfirm
          title="¿Está seguro?"
          onConfirm={() => handleDeleteProduct(record)}
          okText="Sí"
          cancelText="No"
        >
          <Button danger>Eliminar</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id_producto"
      /*pagination={{ pageSize: 6 }}*/
      scroll={{
        y: 400, // Altura de la tabla, ajusta el valor según lo que necesites
      }}
      locale={{
        emptyText: "No hay datos que coincidan con su búsqueda", // Mensaje cuando no hay datos
        triggerDesc: "Haga clic para ordenar de forma descendente",
        triggerAsc: "Haga clic para ordenar de forma ascendente",
        cancelSort: "Cancelar ordenación",
      }}

      className={styles.tableContainer}
    />
  );
};

export default InventoryTable;
