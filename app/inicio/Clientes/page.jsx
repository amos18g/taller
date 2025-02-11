"use client"; // 🔹 Indica que este componente debe renderizarse en el cliente

import { Avatar, Space, Table, Typography } from "antd";

const staticCustomers = [
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

function Customers() {
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => <Avatar src={link} />, // 🔹 Evita problemas con funciones en Server Components
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "Last Name",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Address",
            dataIndex: "address",
            render: (address) => `${address.address}, ${address.city}`,
          },
        ]}
        dataSource={staticCustomers}
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
}

export default Customers;
