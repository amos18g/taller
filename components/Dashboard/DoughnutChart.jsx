import { Card } from "antd";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

function DoughnutChart({titulo, data}) {

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Distribución de ventas por categoría", padding: 10 },
    },
  };

  return (
    <Card style={{ width: 300, height: 300 }}>
      {titulo}
      <Doughnut data={data} options={options} />
    </Card>
  );
}

export default DoughnutChart;
