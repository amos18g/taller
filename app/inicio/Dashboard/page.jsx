"use client";
import { Space, spin } from "antd";
import { ShoppingCartOutlined, DollarCircleOutlined } from "@ant-design/icons";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardChart from "@/components/Dashboard/DashboardChart";
import DashboardChartGastos from "@/components/Dashboard/DashboardChartGastos";;
import Tabla from "@/components/Dashboard/Tabla";
import PieChart from "@/components/Dashboard/PieChart";
import DoughnutChart from "@/components/Dashboard/DoughnutChart";
import iconStyle from "./IconStyle";

//datos de ejemplo
import {
  productosMasVendidos2,
  ventasPorMes,
  comprasPorMes,
  categoriasMasVendidas2,
} from "./staticData";
import { useDashboard } from "../../../hooks/useDashboard";

function Dashboard() {
  
  const {
    ventasDelDia,
    ingresosDia,
    ventasDelMes,
    ingresosMes,
    gastos,
    loading,
    ingresosUltimosMeses,
    productosMasVendidos,
    categoriasMasVendidas,
    error,

  } = useDashboard();

  // console.log(ingresosDia, ingresosMes, gastos)
  console.log("ingresos ultimos meses",ingresosUltimosMeses);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <Space size={20} direction="vertical">
        <Space direction="horizontal">
          <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
            title="Ventas del día"
            value={ventasDelDia}
            loading={loading}
          />
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("green")} />}
            title="Ingresos del día"
            value={`$${ingresosDia}`}
            loading={loading}
          />
          <DashboardCard
            icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
            title="Ventas del mes"
            value={ventasDelMes}
            loading={loading}
          />
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("green")} />}
            title="Ingresos del mes"
            value={`$${ingresosMes}`}
            loading={loading}
          />
          <DashboardCard
            icon={<DollarCircleOutlined style={iconStyle("red")} />}
            title="Gastos del mes"
            value={`$${gastos}`}
            loading={loading}
          />
        </Space>

        <Space>
          <DashboardChart
            title="Ingresos por mes"
            data={ingresosUltimosMeses}
            loading={loading}
          />
          <DashboardChartGastos title="Gastos del mes"
           backgroundColor = "#ed5c34" 
           borderColor = "#df1c06"
           loading={loading}/>
          
        </Space>

        <Space>
          <Tabla data={productosMasVendidos} loading={loading} />

          <PieChart
            titulo="Productos más vendidos"
            data={productosMasVendidos}
            loading = {loading}
    
          />
          <DoughnutChart
            titulo="Categorias más vendidas"
            data={categoriasMasVendidas}
            loading = {loading}
          />
        </Space>
      </Space>
    </div>
  );
}

export default Dashboard;
