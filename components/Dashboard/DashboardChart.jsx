import { Card, Spin } from "antd";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DashboardChart({ title, data, loading = false }) {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: title },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Bar options={options} data={data || { labels: [], datasets: [] }} />
      )}
    </Card>
  );
}

export default DashboardChart;