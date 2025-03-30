"use client";
import { Space, spin, DatePicker, Card } from "antd";
import { ShoppingCartOutlined, DollarCircleOutlined } from "@ant-design/icons";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import DashboardChart from "@/components/Dashboard/DashboardChart";
import DashboardChartGastos from "@/components/Dashboard/DashboardChartGastos";;
import Tabla from "@/components/Dashboard/Tabla";
import PieChart from "@/components/Dashboard/PieChart";
import DoughnutChart from "@/components/Dashboard/DoughnutChart";
import iconStyle from "./IconStyle";
import { useDashboard } from "../../../hooks/useDashboard";

function Dashboard() {
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
    } = useDashboard();

    if (error) {
        return <div className="bg-white p-8 rounded-lg shadow-md">Error: {error}</div>;
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

            <Space size={20} direction="vertical">
                <Space direction="horizontal">
                    
                    <Space  direction="vertical" >
                    <DatePicker></DatePicker>
                    <DashboardCard
                        icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
                        title="Ventas del día"
                        value={ventasDelDia}
                        loading={loadingVentasDia}
                    />
                    </Space>

                    <Space  direction="vertical" >
                    <DatePicker></DatePicker>
                    <DashboardCard
                        icon={<DollarCircleOutlined style={iconStyle("green")} />}
                        title="Ingresos del día"
                        value={ingresosDia}
                        loading={loadingIngresosDia}
                    />
                    </Space>

                    <Space direction="vertical">
                    <DatePicker></DatePicker>
                    <DashboardCard
                        icon={<ShoppingCartOutlined style={iconStyle("blue")} />}
                        title="Ventas del mes"
                        value={ventasDelMes}
                        loading={loadingVentasMes}
                    />
                    </Space>

                    <Space direction="vertical">
                    <DatePicker></DatePicker>
                    <DashboardCard
                        icon={<DollarCircleOutlined style={iconStyle("green")} />}
                        title="Ingresos del mes"
                        value={ingresosMes}
                        loading={loadingIngresosMes}
                    />
                    </Space>

                    <Space direction="vertical">
                    <DatePicker></DatePicker>
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
                        backgroundColor="#ed5c34" 
                        borderColor="#df1c06"
                        loading={loadingGastos}
                    />
                </Space>

                <Space>
                    <Tabla 
                        data={productosMasVendidos} 
                        loading={loadingProductos} 
                    />
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
