"use client";
import { useState, useEffect } from "react";
import {
  Space,
  Table,
  Button,
  Tag,
  Input,
  Form,
  message,
  Drawer,
  Switch,
  Popconfirm,
} from "antd";
import "./Categorias.css";
import { useCategorias } from "@/hooks/useCategorias";

// Función para editar la categoría
function EditCategoryDrawer({ visible, onClose, category, onSave }) {
  const [form] = Form.useForm();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (visible && category) {
      form.setFieldsValue(category);
    }
  }, [category, form, visible]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const values = await form.validateFields();
      await onSave(values);
      onClose();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Dawer para editar
  return (
    <Drawer
      title="Editar Categoría"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      forceRender={true}
      styles={{
        body: { padding: "24px", backgroundColor: "#fafafa" },
        header: {
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #e8e8e8",
          fontWeight: "bold",
        },
      }}
    > 
      <Form form={form} layout="vertical" onFinish={handleSave}>
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
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item name="activo" label="Activo" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2" disabled={isSaving}>
            Cancelar
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#FFA500", borderColor: "#FFA500" }}
            loading={isSaving}
          >
            {isSaving ? "Guardando" : "Guardar"}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}

// Función para agregar categoría
function AddCategoryDrawer({ visible, onClose, onAdd }) {
  const [form] = Form.useForm();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    try {
      setIsAdding(true);
      const values = await form.validateFields();
      await onAdd(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error al agregar la categoría:", error);
    } finally {
      setIsAdding(false);
    }
  };

  //drawer para agregar
  return (
    <Drawer
      title="Agregar Nueva Categoría"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      styles={{
        body: { padding: "24px", backgroundColor: "#fafafa" },
        header: {
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #e8e8e8",
          fontWeight: "bold",
        },
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleAdd}>
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
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item name="activo" label="Activo" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div className="flex justify-end mb-2">
          <Button onClick={onClose} className="mr-2" disabled={isAdding}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={isAdding}>
            {isAdding ? "Agregando" : "Agregar"}
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}

function Categorias() {
  const {
    categorias,
    loading,
    crearCategoria,
    actualizarCategoria,
    deleteCategoria,
  } = useCategorias();
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // buscar categoría
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCategorias = categorias?.filter(
    (categoria) =>
      categoria.nombre.toLowerCase().includes(searchTerm) ||
      (categoria.descripcion &&
        categoria.descripcion.toLowerCase().includes(searchTerm))
  );

  // editar categoría
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setIsEditDrawerVisible(true);
  };

  const handleSaveCategory = async (values) => {
    await actualizarCategoria(selectedCategory.id_categoria, values);
    message.success("Categoría actualizada correctamente");
    setIsEditDrawerVisible(false);
  };

  // agregar categoría
  const handleAddCategory = async (values) => {
    await crearCategoria(values);
    message.success("Categoría agregada correctamente");
    setIsAddDrawerVisible(false);
  };

  // Función para eliminar la categoría
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoria(id);
      message.success("Categoría eliminada correctamente");
    } catch (error) {
      message.error("Error al eliminar la categoría");
    }
  };

  // tabla de categorías
  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre", width: 150 },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 300,
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
      width: 100,
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleEditCategory(record)}
            className="btn-editar"
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Está seguro de eliminar esta categoría?"
            onConfirm={() => handleDeleteCategory(record.id_categoria)}
            okText="Sí"
            cancelText="No"
          >
            <Button className="btn-eliminar" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <div
        className="table-container bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-md hover:shadow-xl p-6 w-full max-w-[1400px] h-[600px] 
      overflow-y-auto transform hover:scale-105 transition-all duration-300 border border-gray-300"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Categorías</h1>
        <div className="titulo flex items-center justify-between mt-5 mb-4">
          <Input
            type="text"
            placeholder="Buscar por nombre"
            className="busqueda w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button type="primary" onClick={() => setIsAddDrawerVisible(true)}>
            Agregar Categoría
          </Button>
        </div>
        <div className="table-container">
          <Table
            dataSource={filteredCategorias}
            columns={columns}
            rowKey="id_categoria"
            loading={loading}
            pagination={{ pageSize: 6 }}
            className="custom-table"
          />
        </div>
      </div>

      <EditCategoryDrawer
        visible={isEditDrawerVisible}
        onClose={() => setIsEditDrawerVisible(false)}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />

      <AddCategoryDrawer
        visible={isAddDrawerVisible}
        onClose={() => setIsAddDrawerVisible(false)}
        onAdd={handleAddCategory}
      />
    </>
  );
}

export default Categorias;
