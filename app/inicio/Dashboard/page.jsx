"use client";
import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Card, Space, Statistic, Table, Typography } from "antd";
  import { Bar } from "react-chartjs-2";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
  const staticData = {
    orders: 120,
    inventory: 450,
    customers: 300,
    revenue: 25000,
    recentOrders: [
      { key: 1, title: "Product A", quantity: 2, discountedPrice: "$20" },
      { key: 2, title: "Product B", quantity: 1, discountedPrice: "$15" },
      { key: 3, title: "Product C", quantity: 5, discountedPrice: "$50" },
    ],
    revenueData: {
      labels: ["User-1", "User-2", "User-3"],
      datasets: [
        {
          label: "Revenue",
          data: [5000, 8000, 12000],
          backgroundColor: "rgba(255, 0, 0, 1)",
        },
      ],
    },
  };
  
  function Dashboard() {
    return (
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("green")} />}
            title={"Orders"}
            value={staticData.orders}
          />
          <DashboardCard
            icon={<ShoppingOutlined style={iconStyle("blue")} />}
            title={"Inventory"}
            value={staticData.inventory}
          />
          <DashboardCard
            icon={<UserOutlined style={iconStyle("purple")} />}
            title={"Customer"}
            value={staticData.customers}
          />
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("red")} />}
            title={"Revenue"}
            value={staticData.revenue}
          />
        </Space>
        <Space>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    );
  }
  
  const iconStyle = (color) => ({
    color: color,
    backgroundColor: `rgba(${color === "green" ? "0,255,0" : color === "blue" ? "0,0,255" : color === "purple" ? "128,0,128" : "255,0,0"},0.25)`,
    borderRadius: 20,
    fontSize: 24,
    padding: 8,
  });
  
  function DashboardCard({ title, value, icon }) {
    return (
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }
  
  function RecentOrders() {
    return (
      <>
        <Typography.Text>Recent Orders</Typography.Text>
        <Table
          columns={[
            { title: "Title", dataIndex: "title" },
            { title: "Quantity", dataIndex: "quantity" },
            { title: "Price", dataIndex: "discountedPrice" },
          ]}
          dataSource={staticData.recentOrders}
          pagination={false}
        />
      </>
    );
  }
  
  function DashboardChart() {
    const options = {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Order Revenue" },
      },
    };
  
    return (
      <Card style={{ width: 500, height: 250 }}>
        <Bar options={options} data={staticData.revenueData} />
      </Card>
    );
  }
  
  export default Dashboard;
  