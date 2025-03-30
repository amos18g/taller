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

function DashboardChart({
  title,
  data = [],
  loading = false,
  backgroundColor = "#48f148",
  borderColor = "rgba(0, 100, 0, 1)",
}) {
 
  const dataArray = Array.isArray(data) ? data : data ? Object.values(data) : [];

  const chartData = {
    labels: dataArray.map((item) => item.mes), // Extrae los meses
    datasets: [
      {
        label: "Ingresos ($)",
        data: dataArray.map((item) => item.ingreso), // Extrae los ingresos
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
    <Card style={{ width: 500, height: 250 }}>
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

export default DashboardChart;
