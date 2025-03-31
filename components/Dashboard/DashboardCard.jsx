import { Card, Space, Statistic, Spin } from "antd";

function DashboardCard({ title, value, icon, loading = false }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        {loading ? (
          <Spin size="small" />
        ) : (
          <Statistic title={title} value={value ?? 0} />
        )}
      </Space>
    </Card>
  );
}

export default DashboardCard;