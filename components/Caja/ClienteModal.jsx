
"use client";
import { Modal, Form, Input } from "antd";

const ClienteModal = ({ open, onCancel, onSave, clienteData }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); // Devuelve los datos al padre
        form.resetFields();
      })
      .catch((info) => {
        console.log("Errores en el formulario:", info);
      });
  };

  return (
    <Modal
      title="Datos del Cliente"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Continuar con la venta"
      cancelText="Cancelar"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={clienteData}
      >
        <Form.Item
          name="nombre"
          label="Nombre"
          rules={[{ required: false, message: "Por favor ingrese el nombre" },
                  {pattern: /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/, message: "Solo se permiten letras",}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="correo"
          label="Correo Electrónico"
          rules={[
            { required: false, message: "Por favor ingrese el correo" },
            { type: "email", message: "Correo inválido" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="identidad"
          label="Número de Identidad"
          rules={[{ required: false, message: "Ingrese el número de identidad" },
            { pattern: /^\d{4}-\d{4}-\d{5}$/, message: "El formato debe ser XXXX-XXXX-XXXXX",}
          ]}
        >
          <Input  placeholder="0801-2000-05800"/>
        </Form.Item>
        <Form.Item
          name="rtn"
          label="RTN"
          rules={[{ required: false, message: "Ingrese el RTN" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClienteModal;
