"use client";
import { Space, Table, Button } from "antd";
import styles from "./inventario.module.css"; 
import Link from 'next/link';
import { useProductos } from "@/hooks/useProductos"; // Hook personalizado

const Inventory = () => {
  const { data, loading, error } = useProductos();

  const columns = [
    { 
      title: "Nombre", 
      dataIndex: "nombre", 
      key: "nombre", 
      width: 200 
    },
    { 
      title: "Precio", 
      dataIndex: "precio_venta", 
      key: "precio_venta", 
      render: (value) => <span>${value.toFixed(2)}</span>, 
      width: 150 
    },
    { 
      title: "Cantidad", 
      dataIndex: "stock_actual", 
      key: "stock_actual", 
      width: 100, 
      render: (stock) => (
        <span className={`${stock < 10 ? styles.stockLow : styles.stockHigh}`}>
          {stock}
        </span>
      ) 
    },
    { 
      title: "Categoría", 
      dataIndex: "categoria", 
      key: "categoria", 
      width: 150 
    },
    { 
      title: "Unidad", 
      dataIndex: "unidad", 
      key: "unidad", 
      width: 150 
    },
    { 
      title: "Editar", 
      key: "editar", 
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)}>Editar</Button>
      ), 
      width: 100 
    },
    { 
      title: "Eliminar", 
      key: "eliminar", 
      render: (_, record) => (
        <Button 
          className={styles.buttonEliminar} 
          onClick={() => handleDelete(record)}
        >
          Eliminar
        </Button>
      ), 
      width: 100 
    }
  ];

  return (
    <Space size={20} direction="vertical">
      <div className={styles.buttonContainer}>
        <Link href="/inicio/inventario/agregar">
          <Button type="primary">Agregar Producto</Button>
        </Link>
      </div>

      <Table
        className={styles.tableContainer}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id_producto"
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
};

export default Inventory;
