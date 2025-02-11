"use client";
import { Avatar, Rate, Space, Table, Button } from "antd";
import styles from "./inventario.module.css"; 
import Link from 'next/link';
const dataSource = [
  {
    key: "1",
    thumbnail: "https://example.com/thumbnail1.jpg", // Usa una URL válida de imagen
    title: "Product 1",
    price: 100,
    rating: 4.5,
    stock: 50,
    brand: "Brand A",
    category: "Category 1",
  },
  {
    key: "2",
    thumbnail: "https://example.com/thumbnail2.jpg", // Usa una URL válida de imagen
    title: "Product 2",
    price: 150,
    rating: 3.8,
    stock: 30,
    brand: "Brand B",
    category: "Category 2",
  },
  {
    key: "3",
    thumbnail: "https://example.com/thumbnail2.jpg", // Usa una URL válida de imagen
    title: "Product 2",
    price: 150,
    rating: 3.8,
    stock: 30,
    brand: "Brand B",
    category: "Category 2",
  },
  {
    key: "4",
    thumbnail: "https://example.com/thumbnail2.jpg", // Usa una URL válida de imagen
    title: "Product 2",
    price: 150,
    rating: 3.8,
    stock: 30,
    brand: "Brand B",
    category: "Category 2",
  },
  {
    key: "5",
    thumbnail: "https://example.com/thumbnail2.jpg", // Usa una URL válida de imagen
    title: "Product 2",
    price: 150,
    rating: 3.8,
    stock: 30,
    brand: "Brand B",
    category: "Category 2",
  },
  {
    key: "6",
    thumbnail: "https://example.com/thumbnail2.jpg", // Usa una URL válida de imagen
    title: "Product 2",
    price: 150,
    rating: 3.8,
    stock: 30,
    brand: "Brand B",
    category: "Category 2",
  }
  // Añadir más productos según sea necesario
];

const Inventory = () => {
  return (
    <Space size={20} direction="vertical">

        <div className={styles.buttonContainer}>
        <Link href="/inicio/inventario/agregar">
         <Button type="primary">
          Agregar Producto
         </Button>
        </Link>
        </div>
      
      <Table className={styles.tableContainer}
        columns={[
          {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>${value}</span>,
          },
          {
            title: "Rating",
            dataIndex: "rating",
            render: (rating) => {
              return <Rate value={rating} allowHalf disabled />;
            },
          },
          {
            title: "Stock",
            dataIndex: "stock",
          },
          {
            title: "Brand",
            dataIndex: "brand",
          },
          {
            title: "Category",
            dataIndex: "category",
          },
          {
            title: "Editar",
            dataIndex: "Editar",
            render: (_, record) => (
              <Button type="default" onClick={() => handleAdd(record)}>
                Editar
              </Button>
            ),
          },
          {
            title: "Eliminar",
            dataIndex: "Eliminar",
            render: (_, record) => (
              <Button type="disabled" className={styles.buttonEliminar}  onClick={() => handleAdd(record)}>
                Eliminar
              </Button>
            ),
          }
          
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />

  
       
      
          
    </Space>
  );
};

export default Inventory;