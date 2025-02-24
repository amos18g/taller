"use client";
import { useEffect, useState } from "react";
import { Space, Table, Button, Tag, Popconfirm, message } from "antd";
import styles from "./inventario.module.css";
import Link from "next/link";
import { useProductos } from "@/hooks/useProductos";
import { useRouter } from "next/navigation";

const Inventory = () => {
  const { data, loading, error, eliminarProducto } = useProductos();
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

  // Función para eliminar la categoría
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
      width: 200,
      sorter: (a, b) => a.nombre.localeCompare(b.nombre),
      render: (text) => <span>{text}</span>,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Costo",
      dataIndex: "costo",
      key: "costo",
      render: (value) => <span>${value.toFixed(2)}</span>,
      width: 150,
      sorter: (a, b) => a.costo - b.costo,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Precio de venta",
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
      render: (stock) => {
        let tagStyle = "green"; // Verde por defecto para cantidades normales o altas

        // Si la cantidad es baja (menos de 20), asigna rojo
        if (stock < 20) {
          tagStyle = "volcano"; // Rojo
        }

        return <Tag color={tagStyle}>{stock}</Tag>;
      },
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
        <Popconfirm
          title="¿Está seguro de eliminar esta categoría?"
          onConfirm={() => handleDeleteProduct(record)}
          okText="Sí"
          cancelText="No"
        >
          <Button className="btn-eliminar" danger>
            Eliminar
          </Button>
        </Popconfirm>
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
        /*
        pagination={{
          pageSize: 6, // Número de filas por página
          showSizeChanger: false, // Quitar la opción de cambiar el número de filas por página
        }}
          */
        scroll={{
          y: 400, // Altura de la tabla, ajusta el valor según lo que necesites
        }}
        locale={{
          emptyText: "No hay datos que coincidan con su búsqueda", // Mensaje cuando no hay datos
          triggerDesc: "Haga clic para ordenar de forma descendente",
          triggerAsc: "Haga clic para ordenar de forma ascendente",
          cancelSort: "Cancelar ordenación",
        }}
      />
    </Space>
  );
};

export default Inventory;
