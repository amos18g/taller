import { Card, Spin } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ titulo, data, loading = false }) {
  // Si está cargando, mostramos el Spin
  if (loading) {
    return (
      <Card style={{ width: 300, height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" />
      </Card>
    );
  }

  // Datos del gráfico
  const chartData = {
    labels: data?.map((item) => item.nombre_producto) || [],
    datasets: [
      {
        data: data?.map((item) => item.total_cantidad_vendida) || [],
        backgroundColor: ["#ff0037", "#0099ff", "#FFCE56", "#15fa00", "#76c6e3"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Distribución de Productos más Vendidos", padding: 10 },
    },
  };

  return (
    <Card style={{ width: 300, height: 300 }}>
      {titulo}
      <Pie data={chartData} options={options} />
    </Card>
  );
}

export default PieChart;
