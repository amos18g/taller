"use client";
import { Space, Table, Button } from "antd";
import styles from "./inventario.module.css"; 
import Link from 'next/link';
import { useProductos } from "@/hooks/useProductos"; // Hook personalizado

const Inventory = () => {
  const { data, loading, error } = useProductos();
  console.log(data);

  const handleSort = (columnKey, order) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === "ascend") {
        return a[columnKey] > b[columnKey] ? 1 : -1;
      } else {
        return a[columnKey] < b[columnKey] ? 1 : -1;
      }
    });
    return sortedData;
  };

  const columns = [
    { 
      title: "Nombre", 
      dataIndex: "nombre", 
      key: "nombre", 
      width: 200,
      sorter: (a, b) => a.nombre.localeCompare(b.nombre), 
      render: (text) => <span>{text}</span>,
      sortDirections: ['ascend', 'descend'],
    },
    { 
      title: "Precio", 
      dataIndex: "precio_venta", 
      key: "precio_venta", 
      render: (value) => <span>${value.toFixed(2)}</span>, 
      width: 150,
      sorter: (a, b) => a.precio_venta - b.precio_venta, 
      sortDirections: ['ascend', 'descend'],
    },
    { 
      title: "Cantidad", 
      dataIndex: "stock_actual", 
      key: "stock_actual", 
      width: 100, 
      render: (stock) => (
        <span className={`${stock < 20 ? styles.stockLow : styles.stockHigh}`}>
          {stock}
        </span>
      ),
      sorter: (a, b) => a.stock_actual - b.stock_actual, 
      sortDirections: ['ascend', 'descend'],
    },
    { 
      title: "Categoría", 
      dataIndex: "categoria",  
      key: "categoria", 
      width: 150,
      render: (categoria) => <span>{categoria}</span>, // Muestra el nombre de la categoría
    },
    { 
      title: "Unidad", 
      dataIndex: "unidad",  
      key: "unidad", 
      width: 150,
      render: (unidad) => <span>{unidad}</span>,
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
        onChange={(pagination, filters, sorter) => {
          if (sorter.order) {
            const sortedData = handleSort(sorter.columnKey, sorter.order);
          }
        }}
      />
    </Space>
  );
};

export default Inventory;
