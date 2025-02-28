"use client";
import { Table, Button, Tag, Popconfirm, message } from "antd";
import { useRouter } from "next/navigation";
import  useCartStore  from "@/store/CartStore";  // Importar directamente el store
import styles from "../../styles/inventario.module.css";

const InventoryTable = ({ data, loading, eliminarProducto }) => {
  const router = useRouter();
  const { addToCart } = useCartStore();  // Obtener la función directamente del store

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

  const handleAddToCaja = (record) => {
    addToCart(record);  // Agregar producto directamente al carrito
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
      width: 100,
      align: "center",
    },
    {
      title: "Precio de venta",
      dataIndex: "precio_venta",
      key: "precio_venta",
      render: (value) => `$${value.toFixed(2)}`,
      sorter: (a, b) => a.precio_venta - b.precio_venta,
      align: "center",
    },
    {
      title: "Cantidad",
      dataIndex: "stock_actual",
      key: "stock_actual",
      render: (stock) => (
        stock === 0 ? (
          <Tag color="gray">Agotado</Tag>  // Cambiar color a gris si el stock es 0
        ) : (
          <Tag color={stock < 20 ? "volcano" : "green"}>{stock}</Tag>
        )
      ),
      width: 100,
      sorter: (a, b) => a.stock_actual - b.stock_actual,
      align: "center",
    }
    ,
    {
      title: "Categoría",
      dataIndex: "categoria",
      key: "categoria",
      align: "center",
    },
    {
      title: "Unidad",
      dataIndex: "unidad",
      key: "unidad",
      width: 100,
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
          title="¿Está seguro?"
          onConfirm={() => handleDeleteProduct(record)}
          okText="Sí"
          cancelText="No"
        >
          <Button danger>Eliminar</Button>
        </Popconfirm>
      ),
      width: 100,
    },
    {
      title: "Agregar a Caja",
      key: "agregar",
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => handleAddToCaja(record)} 
          disabled={record.stock_actual === 0}  // Deshabilitar si el stock es 0
        >
          Agregar a Caja
        </Button>
      ),
    }
    ,
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id_producto"
      scroll={{ y: 400 }}
      locale={{
        emptyText: "No hay datos que coincidan con su búsqueda",
        triggerDesc: "Haga clic para ordenar de forma descendente",
        triggerAsc: "Haga clic para ordenar de forma ascendente",
        cancelSort: "Cancelar ordenación",
      }}
      className={styles.tableContainer}
    />
  );
};

export default InventoryTable;
