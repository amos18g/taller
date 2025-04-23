"use client";
import { useState } from "react";
import { Space, spin, DatePicker, Card } from "antd";
import { ShoppingCartOutlined, DollarCircleOutlined } from "@ant-design/icons";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardChart from "@/components/Dashboard/DashboardChart";
import DashboardChartGastos from "@/components/Dashboard/DashboardChartGastos";
import Tabla from "@/components/Dashboard/Tabla";
import PieChart from "@/components/Dashboard/PieChart";
import DoughnutChart from "@/components/Dashboard/DoughnutChart";
import iconStyle from "./IconStyle";
import dayjs from "dayjs";
import { useDashboard } from "../../../hooks/useDashboard";

function Dashboard() {
  const [fechaVentasDia, setfechaVentasDia] = useState(dayjs());
  const [fechaIngresosDeldia, setfechaIngresosDeldia] = useState(dayjs());

  const [fechaVentasMes, setfechaVentasMes] = useState(dayjs());
  const [fechaIngresosMes, setfechaIngresosMes] = useState(dayjs());
  const [fechaGastosMes, setfechaGastosMes] = useState(dayjs());

  const {
    ventasDelDia,
    ingresosMes,
    ventasDelMes,
    ingresosDia,
    gastos,
    ingresosUltimosMeses,
    productosMasVendidos,
    categoriasMasVendidas,
    loadingVentasDia,
    loadingIngresosDia,
    loadingVentasMes,
    loadingIngresosMes,
    loadingGastos,
    loadingIngresosMeses,
    loadingProductos,
    loadingCategorias,
    error,
  } = useDashboard(
    fechaVentasDia.format("YYYY-MM-DD"),
    fechaIngresosDeldia.format("YYYY-MM-DD"),
    fechaVentasMes.format("YYYY-MM") + "-01",
    fechaIngresosMes.format("YYYY-MM") + "-01",
    fechaGastosMes.format("YYYY-MM") + "-01"
  );

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">Error: {error}</div>
    );
  }

  const handleFechaChange = (setter) => (date) => {
    setter(date || dayjs());
  };


  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-[1200px]">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <Space size={20} direction="vertical">
        <Space direction="horizontal" align="start" size={32}>
          <Space direction="vertical" >
            <span className="text-sm">Filtrar ventas del dia</span>
            <DatePicker
              value={fechaVentasDia}
              //onChange={(date) => date && setfechaVentasDia(date || dayjs().format("YYYY-MM-DD"))}
              onChange={handleFechaChange(setfechaVentasDia)}
              style={{ width: "200px" }}
            />

            <DashboardCard
              icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
              title="Ventas del día"
              value={ventasDelDia}
              loading={loadingVentasDia}
            />
          </Space>

          <Space direction="vertical">
            <span className="text-sm">Filtrar ingresos del dia</span>
            <DatePicker
              value={fechaIngresosDeldia}
              // onChange={(date) => date && setfechaIngresosDeldia(date || dayjs().format("YYYY-MM-DD"))}
              onChange={handleFechaChange(setfechaIngresosDeldia)}
              style={{ width: "200px" }}
            />

            <DashboardCard
              icon={<DollarCircleOutlined style={iconStyle("green")} />}
              title="Ingresos del día"
              value={ingresosDia}
              loading={loadingIngresosDia}
            />
          </Space>

          <Space direction="vertical">
            <span className="text-sm">Filtrar ventas del mes</span>
            <DatePicker
              picker="month"
              value={fechaVentasMes}
              //onChange={(date) => date && setfechaVentasMes(date || dayjs().format("YYYY-MM") + "-01")}
              onChange={handleFechaChange(setfechaVentasMes)}
              style={{ width: "200px" }}

            />
            <DashboardCard
              icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
              title="Ventas del mes"
              value={ventasDelMes}
              loading={loadingVentasMes}
            />
          </Space>

          <Space direction="vertical">
            <span className="text-sm">Filtrar ingresos del mes</span>
            <DatePicker
              picker="month"
              value={fechaIngresosMes}
              //onChange={(date) => date && setfechaIngresosMes(date || dayjs().format("YYYY-MM") + "-01")}
              onChange={handleFechaChange(setfechaIngresosMes)}
              style={{ width: "200px" }}
            />
            <DashboardCard
              icon={<DollarCircleOutlined style={iconStyle("green")} />}
              title="Ingresos del mes"
              value={ingresosMes}
              loading={loadingIngresosMes}
            />
          </Space>

          <Space direction="vertical">
            <span className="text-sm">Filtrar gastos del mes</span>
            <DatePicker
              picker="month"
              value={fechaGastosMes}
              // onChange={(date) => date && setfechaGastosMes(date || dayjs().format("YYYY-MM") + "-01")}
              onChange={handleFechaChange(setfechaGastosMes)}
              style={{ width: "200px" }}
            />
            <DashboardCard
              icon={<DollarCircleOutlined style={iconStyle("red")} />}
              title="Gastos del mes"
              value={gastos}
              loading={loadingGastos}
            />
          </Space>
        </Space>

        <Space>
          <DashboardChart
            title="Ingresos por mes"
            data={ingresosUltimosMeses}
            loading={loadingIngresosMeses}
          />
          <DashboardChartGastos
            title="Gastos del mes"
            backgroundColor="#ec7e17"
            borderColor="#df1c06"
            loading={loadingGastos}
          />
        </Space>

        <Space>
          <Tabla data={productosMasVendidos} loading={loadingProductos} />
          <PieChart
            titulo="Productos más vendidos"
            data={productosMasVendidos}
            loading={loadingProductos}
          />
          <DoughnutChart
            titulo="Categorias más vendidas"
            data={categoriasMasVendidas}
            loading={loadingCategorias}
          />
        </Space>
      </Space>
    </div>
  );
}

export default Dashboard;
