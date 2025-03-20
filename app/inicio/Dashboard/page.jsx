"use client";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { Bar, Pie, Doughnut } from "react-chartjs-2"; // 1. Añadir importación de Pie
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // 2. Añadir elementos para pie chart
  PieController, // 2. Añadir controlador para pie chart
} from 'chart.js';

// 3. Registrar nuevos elementos
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
);

const staticData = {
  total_ventas: 120,
  total_inventario: 450,
  total_clientes: 300,
  total_ingresos: 25000,
  total_gastos: 15000,
  productos_mas_vendidos: [
    { key: 1, nombre: "Laptop", cantidad: 10, precio: "$1000" },
    { key: 2, nombre: "Mouse", cantidad: 25, precio: "$25" },
    { key: 3, nombre: "Teclado", cantidad: 15, precio: "$45" },
  ],
  ventas_por_mes: {
    labels: ["Enero", "Febrero", "Marzo"],
    datasets: [
      {
        label: "Ventas ($)",
        data: [5000, 8000, 12000],
        backgroundColor: "#48f148",  // Color verde
        borderColor: "rgba(0, 100, 0, 1)",      // Borde verde oscuro
        borderWidth: 1,
      },
    ],
  },
  compras_por_mes: {
    labels: ["Enero", "Febrero", "Marzo"],
    datasets: [
      {
        label: "Compras ($)",
        data: [3000, 6000, 9000],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  },
};

function Dashboard() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <Space size={20} direction="vertical">
        <Space direction="horizontal">
          <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
            title={"Ventas del dia"}
            value={staticData.total_ventas}
          />

          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("green")} />}
            title={"Ingresos del dia"}
            value={`$${staticData.total_ingresos}`}
          />

            <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
            title={"Ventas del mes"}
            value={staticData.total_ventas}
          />

          
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("green")} />}
            title={"Ingresos del mes"}
            value={`$${staticData.total_ingresos}`}
          />
         
        
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("red")} />}
            title={"Gastos del mes"}
            value={`$${staticData.total_gastos}`}
          />
        </Space>

        <Space>
          <DashboardChart
            title="Ventas por mes"
            data={staticData.ventas_por_mes}
          />
          <DashboardChart
            title="Compras por mes"
            data={staticData.compras_por_mes}
          />
        </Space>

        <Space>
          <TablaProductosMasvendidos direction="horizontal" />
          <ProductosPieChart />
          <GraficoCategorias />
        </Space>
      </Space>
    </div>
  );
}

const iconStyle = (color) => ({
  color: color,
  backgroundColor: `rgba(${color === "green" ? "0,255,0" : color === "blue" ? "0,0,255" : color === "purple" ? "128,0,128" : color === "red" ? "255,0,0" : "255,165,0"},0.25)`,
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

function TablaProductosMasvendidos() {
  return (
  
     <Card>
      <Typography.Text>Productos más vendidos</Typography.Text>
      <Table
        columns={[
          { title: "Nombre", dataIndex: "nombre" },
          { title: "Cantidad", dataIndex: "cantidad" },
          { title: "Precio", dataIndex: "precio" },
        ]}
        dataSource={staticData.productos_mas_vendidos}
        pagination={false}
        
      />
      </Card>
   
  );
}

function DashboardChart({ title, data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: title },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={data} />
    </Card>
  );
}


function ProductosPieChart() {
  const data = {
    labels: staticData.productos_mas_vendidos.map(item => item.nombre),
    datasets: [
      {
        data: staticData.productos_mas_vendidos.map(item => item.cantidad),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Distribución de Productos más Vendidos',
        padding: 10
      }
    }
  };

  return (
    <Card style={{ width: 300, height: 300 }}>
      <Pie data={data} options={options} />
    </Card>
  );



}

function GraficoCategorias() {
  const data = {
    labels: ["Aceites", "Frenos", "Cascos", "Accesorios", "Repuestos"],
    datasets: [
      {
        data: [5000, 6000, 2000, 2000, 1000], // Valores de gastos
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Distribución de ventas por categoría",
        padding: 10
      }
    }
  };

  return (
    <Card style={{ width: 300, height: 300 }}>
      <Doughnut data={data} options={options} />
    </Card>
  );
}

export default Dashboard;
