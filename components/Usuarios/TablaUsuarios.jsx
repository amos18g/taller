"use client";
import { Avatar, Space, Table, Typography, Button, Select, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useEditarRol } from "@/hooks/useEditarRol"; // Asegúrate de importar el hook creado

function TablaUsuarios({ usuarios, loading }) {
  const [nuevoRol, setNuevoRol] = useState(null);
  const { editarRol, loading: loadingRol, error, success } = useEditarRol();

  const handleRolChange = (value) => {
    console.log("el nuevo rol es:", value)
    setNuevoRol(value);
  };

  const handleEditarRol = (idUsuario) => {
    if (!nuevoRol) {
      message.error("Por favor, seleccione un nuevo rol.");
      return;
    }

    editarRol(idUsuario, nuevoRol);
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4} className="text-center">
        Usuarios Registrados
      </Typography.Title>
      <Table
        columns={[
          {
            title: "Nombre",
            dataIndex: "nombre",
            width: 200,
          },
          {
            title: "Email",
            dataIndex: "email",
            width: 100,
            align: "center",
          },
          
          {
            title: "Ultimo inicio de sesión",
            dataIndex: "last_sign_in_at",
            width: 300,
            render: (text) => dayjs(text).format("DD/MM/YYYY hh:mm A"),
          },
          {
            title: "Editar Rol",
            dataIndex: "editar_rol",
            width: 100,
            render: (_, record) => (
              <Space size={10}>
                <Select
                  defaultValue={record.role}
                  style={{ width: 120 }}
                  onChange={handleRolChange}
                  disabled={loadingRol}
                >
                  <Select.Option value="admin">Habilitar</Select.Option>
                  <Select.Option value="user">Deshabilitar</Select.Option>
                </Select>
                <Button
                  type="primary"
                  onClick={() => handleEditarRol(record.id)}
                  loading={loadingRol}
                  disabled={loadingRol || !nuevoRol}
                >
                  Editar
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={usuarios}
        pagination={{ pageSize: 5 }}
        loading={loading}
        rowKey="id"
      />
      {/* Mostrar mensajes de éxito o error */}
      {success && message.success(success)}
      {error && message.error(error)}
    </Space>
  );
}

export default TablaUsuarios;
