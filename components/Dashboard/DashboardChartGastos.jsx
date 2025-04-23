import { Card, Spin } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const datosDePrueba = [
    { mes: "2025-03", gasto: 40000 },
    { mes: "2025-02", gasto: 25000 },
    { mes: "2025-01", gasto: 20000 },
  ];

function DashboardChartGastos({
  title,
  data = datosDePrueba,
  loading = false,
  backgroundColor = "#48f148",
  borderColor = "rgba(0, 100, 0, 1)",
}) {
  // Verificar si data es un array antes de mapear
  const dataArray = Array.isArray(data) ? data : Object.values(data);

  const chartData = {
    labels: dataArray.map((item) => item.mes),
    datasets: [
      {
        label: "Gastos (L)",
        data: dataArray.map((item) => item.gasto),
        borderColor,
        backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: title },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card style={{ width: 555, height: 250 }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Bar options={options} data={chartData} />
      )}
    </Card>
  );
}

export default DashboardChartGastos;
