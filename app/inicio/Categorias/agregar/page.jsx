"use client";
import { useState } from "react";
import { Drawer, Form, Input, Switch, Button } from "antd";

export default function AddCategoryDrawer({ visible, onClose, onAdd }) {
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

  return (
    <Drawer
      title="Agregar Nueva Categoría"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
    >
      <Form form={form} layout="vertical" onFinish={handleAdd}>
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese el nombre" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: "Ingrese la descripción" }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item name="activo" label="Activo" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div className="flex justify-end mb-2">
          <Button onClick={onClose} className="mr-2" disabled={isAdding}>Cancelar</Button>
          <Button type="primary" htmlType="submit" loading={isAdding}>Agregar</Button>
        </div>
      </Form>
    </Drawer>
  );
}
