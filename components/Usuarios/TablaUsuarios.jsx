import { Avatar, Space, Table, Typography, Button, Select, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useEditarRol } from "@/hooks/useEditarRol";

function TablaUsuarios({ usuarios, loading }) {
  //  { [idUsuario]: "admin" | "user" }
  const [rolesSeleccionados, setRolesSeleccionados] = useState({});
  const { editarRol, loading: loadingRol, error, success } = useEditarRol();

  const handleRolChange = (idUsuario, value) => {
    setRolesSeleccionados(prev => ({ ...prev, [idUsuario]: value }));
  };

  const handleEditarRol = (idUsuario) => {
    const nuevoRol = rolesSeleccionados[idUsuario];
    if (!nuevoRol) {
      message.error("Por favor, seleccione un nuevo rol.");
      return;
    }
    editarRol(idUsuario, nuevoRol);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Usuarios Registrados</h1>
    <Space size={20} direction="vertical" className="w-full">
      <Typography.Title level={4} className="text-center">
 
      </Typography.Title>

      <Table
        columns={[
          { title: "Nombre", dataIndex: "nombre", width: 200 },
          { title: "Email", dataIndex: "email", width: 100, align: "center" },
          {
            title: "Último inicio de sesión",
            dataIndex: "last_sign_in_at",
            width: 200,
            render: (text) => dayjs(text).format("DD/MM/YYYY hh:mm A"),
          },
          {
            title: "Editar Rol",
            dataIndex: "editar_rol",
            width: 220,
            render: (_, record) => {
              const seleccionado = rolesSeleccionados[record.id];
              return (
                <Space size={10}>
                  <Select
                    defaultValue={record.role}           // valor actual registrado
                    value={seleccionado ?? record.role}  // valor que ve el usuario
                    style={{ width: 120 }}
                    onChange={(value) => handleRolChange(record.id, value)}
                    disabled={loadingRol}
                  >
                    <Select.Option value="admin">Habilitar</Select.Option>
                    <Select.Option value="user">Deshabilitar</Select.Option>
                  </Select>

                  <Button
                    type="primary"
                    onClick={() => handleEditarRol(record.id)}
                    loading={loadingRol}
                    disabled={loadingRol || !seleccionado}
                  >
                    Editar
                  </Button>
                </Space>
              );
            },
          },
        ]}
        dataSource={usuarios}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

      {success && message.success(success)}
      {error && message.error(error)}
    </Space>
    </div>  
  );
}

export default TablaUsuarios;
