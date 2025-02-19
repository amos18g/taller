"use client";
import { useEffect, useState } from "react";
import { Space, Table, Button } from "antd";
import styles from "./inventario.module.css";
import Link from "next/link";
import { useProductos } from "@/hooks/useProductos";
import { useRouter } from "next/navigation";

const Inventory = () => {
  const { data, loading, error } = useProductos();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(data); // Sincronizar cuando data cambie
  }, [data]);

  // funciion para buscar un producto
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(value) ||
        item.categoria.toLowerCase().includes(value) ||
        item.unidad.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const router = useRouter();

  const handleEdit = (record) => {
    router.push(`/inicio/inventario/editar?id=${record.id_producto}`);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: 200,
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      render: (text) => <span>{text}</span>,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Precio",
      dataIndex: "precio_venta",
      key: "precio_venta",
      render: (value) => <span>${value.toFixed(2)}</span>,
      width: 150,
      sorter: (a, b) => a.precio_venta - b.precio_venta,
      sortDirections: ["ascend", "descend"],
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
      sortDirections: ["ascend", "descend"],
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
      width: 100,
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
      width: 100,
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <div className={styles.buttonContainer}>
        <Link href="/inicio/inventario/agregar">
          <Button type="primary">Agregar Producto</Button>
        </Link>
        <input
          type="text"
          placeholder="Buscar producto"
          className={styles.input}
          onChange={handleSearch}
        />
      </div>

      <Table
        className={styles.tableContainer}
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id_producto"
        pagination={{ pageSize: 5 }}
        locale={{
          emptyText: "No hay datos que coincidan con su busqueda", // Mensaje cuando no hay datos
          triggerDesc: "Haga clic para ordenar de forma descendente",
          triggerAsc: "Haga clic para ordenar de forma ascendente",
          cancelSort: "Cancelar ordenación",
        }}
      />
    </Space>
  );
};

export default Inventory;
