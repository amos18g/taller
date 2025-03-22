import { Card } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart({ data }) {

  const chartData = {
    labels: data.map((item) => item.nombre),
    datasets: [
      {
        data: data.map((item) => item.cantidad),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
      <Pie data={chartData} options={options} />
    </Card>
  );
}

export default PieChart;
