"use client";

import { useState, useEffect } from "react";
import { Space, Table, Button, Tag, Input, Form, message, Modal } from "antd";
import "./Categorias.css";
import {useCategorias, crearCategoria, actualizarCategoria, eliminarCategoria} from "@/hooks/useCategorias";

function EditCategoryModal({ visible, onClose, category, onSave }) {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
    });
  };

  return (
    <Modal
      title="Editar Categoría"
      open={visible}
      onCancel={onClose}
      onOk={handleSave}
    >
      <Form
        form={form}
        initialValues={category}
        layout="vertical"
        onFinish={handleSave}
      >
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: true, message: "Ingrese el nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: "Ingrese la descripción" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function Categorias() {
    const { categorias, setCategorias, loading } = useCategorias();  // Usamos el hook para obtener las categorías y la función para actualizarlas
    console.log("estos son las categorias",categorias);
    const [searchTerm, setSearchTerm] = useState("");  // Nuevo estado para el filtro de búsqueda
    const [filteredCategorias, setFilteredCategorias] = useState(categorias);  // Estado para las categorías filtradas
  
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [form] = Form.useForm();

  const handleAddCategory = (values) => {
    const newCategory = {
      id_categoria: categorias.length + 1,
      nombre: values.nombre,
      descripcion: values.descripcion,
      activo: true,
    };
    setCategorias([...categorias, newCategory]);
    form.resetFields();
    message.success("Categoría agregada correctamente");
  };

  useEffect(() => {
    // Actualizar el filtro cuando las categorias cambien
    if (categorias) {
      setFilteredCategorias(categorias);
    }
  }, [categorias]);

  // Manejo del filtro de búsqueda
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);  // Actualizamos el término de búsqueda

    // Filtrar las categorías según el valor del término de búsqueda
    const filtered = categorias.filter(
      (item) =>
        item.nombre.toLowerCase().includes(value) ||
        item.descripcion.toLowerCase().includes(value)
    );
    setFilteredCategorias(filtered);  // Actualizamos las categorías filtradas
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const handleSaveCategory = (values) => {
    const updatedCategorias = categorias.map((cat) =>
      cat.id_categoria === selectedCategory.id_categoria
        ? { ...cat, ...values }
        : cat
    );
    setCategorias(updatedCategorias);
    setIsModalVisible(false);
    message.success("Categoría actualizada correctamente");
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      width: 150, // Establece un ancho fijo para la columna
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 300, // Establece un ancho fijo para la columna
    },
    {
      title: "Estado",
      dataIndex: "activo",
      key: "activo",
      render: (activo) => (
        <Tag color={activo ? "green" : "red"}>{activo ? "Activo" : "Inactivo"}</Tag>
      ),
      width: 100, // Establece un ancho fijo para la columna
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditCategory(record)}>Editar</Button>
          <Button danger>Eliminar</Button>
        </Space>
      ),
      width: 150, // Establece un ancho fijo para la columna
    },
  ];
  

  return (
    <>
      <div className="contenedor">
        <div className="titulo">
          <input
            type="text"
            placeholder="Buscar categoría"
            className="busqueda"
            value={searchTerm}  // Vinculamos el input al estado searchTerm
            onChange={handleSearch}  // Llamamos al filtro de búsqueda
          />
        </div>
        <div className="table-container">
          <Table
            dataSource={filteredCategorias}  // Usamos las categorías filtradas
            columns={columns}
            rowKey="id_categoria"
            loading={loading}
            pagination={{ pageSize: 4 }}
          />
        </div>
        <div className="form-container">
          <Form className="formulario" form={form} onFinish={handleAddCategory} layout="vertical">
            <h3>Agregar Categoría</h3>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese el nombre" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: "Ingrese la descripción" }]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Agregar</Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Modal Edit */}
      <EditCategoryModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />
    </>
  );
}

export default Categorias;
