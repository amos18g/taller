"use client";
import { useState, useEffect } from "react";
import { Drawer, Form, Input, Switch, Button } from "antd";

export default function EditCategoryDrawer({ visible, onClose, category, onSave }) {
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

  return (
    <Drawer
      title="Editar Categoría"
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
    >
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese el nombre" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: "Ingrese la descripción" }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item name="activo" label="Activo" valuePropName="checked">
          <Switch />
        </Form.Item>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose} className="mr-2" disabled={isSaving}>Cancelar</Button>
          <Button type="primary" htmlType="submit" loading={isSaving}>Guardar</Button>
        </div>
      </Form>
    </Drawer>
  );
}
