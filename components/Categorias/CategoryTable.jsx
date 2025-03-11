"use client";
import { Table, Tag, Button, Popconfirm, Space } from "antd";
import styles from "@/styles/category.module.css"; 
import {EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function CategoryTable({ categorias, loading, onEdit, onDelete }) {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: 190
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 560
    },
    {
      title: "Estado",
      dataIndex: "activo",
      key: "activo",
      render: (activo) => (
        <Tag
          style={{
            backgroundColor: activo ? "#11b016" : "#808080",
            color: "white",
          }}
        >
          {activo ? "Activo" : "Inactivo"}
        </Tag>
      ),
      width: 130,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onEdit(record)} className={styles.btnEditar}>
            <EditOutlined />
            Editar
          </Button>
          <Popconfirm
            title="¿Está seguro de eliminar esta categoría?"
            onConfirm={() => onDelete(record.id_categoria)}
            okText="Sí"
            cancelText="No"
          >
            <Button className={styles.btnEliminar} >
            <DeleteOutlined />
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 260,
    },
  ];

  return (
    <Table
      className="tableContainer"                         
      size="middle"              
      dataSource={categorias}
      columns={columns}
      rowKey="id_categoria"
      loading={loading}
      pagination={{ pageSize: 8 }}
      
    />
  );
}
