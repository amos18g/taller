"use client";
import { Space } from "antd";
import { ShoppingCartOutlined, DollarCircleOutlined } from "@ant-design/icons";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardChart from "@/components/Dashboard/DashboardChart";
import Tabla from "@/components/Dashboard/Tabla";
import PieChart from "@/components/Dashboard/PieChart";
import DoughnutChart from "@/components/Dashboard/DoughnutChart";
import iconStyle from "./IconStyle";

//datos de ejemplo
import {productosMasVendidos, ventasPorMes, comprasPorMes, categoriasMasVendidas } from "./staticData";

function Dashboard() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <Space size={20} direction="vertical">
        <Space direction="horizontal">
          <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
            title="Ventas del día"
            value={500}
          />
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("green")} />}
            title="Ingresos del día"
            value={`$${500}`}
          />
          <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
            title="Ventas del mes"
            value={500}
          />
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("green")} />}
            title="Ingresos del mes"
            value={`$${500}`}
          />
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("red")} />}
            title="Gastos del mes"
            value={`$${500}`}
          />
        </Space>

        <Space>
          <DashboardChart title="Ingresos por mes" data={ventasPorMes} />
          <DashboardChart title="Ventas por mes" data={comprasPorMes} />
        </Space>

        <Space>
          <Tabla data = {productosMasVendidos}/>
          <PieChart data = {productosMasVendidos}/>
          <DoughnutChart data = {categoriasMasVendidas}/>
        </Space>
      </Space>
    </div>
  );
}

export default Dashboard;
