import { Card, Table, Typography, Spin } from "antd";

function Tabla({ data, loading }) {
  return (
    <Card>
      <Typography.Text>Productos más vendidos</Typography.Text>
      <Table
        columns={[
          { title: "Nombre", dataIndex: "nombre_producto" },
          { title: "Cantidad", dataIndex: "total_cantidad_vendida" },
          { title: "Precio", dataIndex: "precio" },
        ]}
        dataSource={[...(data || [])].sort(
          (a, b) => b.total_cantidad_vendida - a.total_cantidad_vendida
        )}
        pagination={false}
        loading={loading}
      />
    </Card>
  );
}

export default Tabla;
