"use client"; // 🔹 Indica que este componente debe renderizarse en el cliente

import { Avatar, Space, Table, Typography } from "antd";

const staticusers = [
  {
    key: "1",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 123-456-7890",
    address: { address: "123 Main St", city: "New York" },
  },
  {
    key: "2",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    phone: "+1 987-654-3210",
    address: { address: "456 Elm St", city: "Los Angeles" },
  },
  {
    key: "3",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    firstName: "Michael",
    lastName: "Brown",
    email: "michaelbrown@example.com",
    phone: "+1 555-678-9012",
    address: { address: "789 Oak St", city: "Chicago" },
  },
];

function TablaUsuarios() {
  return (
    <Space size={20} direction="vertical">
  <Typography.Title level={4} className="text-center">Usuarios Registrados</Typography.Title>
      <Table
        columns={[
          {
            title: "Email",
            dataIndex: "email",
            width: 200
          },
          {
            title: "Fecha de creación",
            dataIndex: "phone",
            width: 200
          },
          {
            title: "Ultima vez que ingresó",
            dataIndex: "address",
            width: 300,
            render: (address) => `${address.address}, ${address.city}`,
          },
        ]}
        dataSource={staticusers}
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
}

export default TablaUsuarios;
