import { Card, Table, Typography, Spin } from "antd";

function Tabla({ data, loading }) {
  return (
    <Card style={{marginTop: 8 }}>
      <div style={{ textAlign: "center", fontWeight: 600}}>
      Productos más vendidos
    </div>
      <Table
        columns={[
          { title: "Nombre", dataIndex: "nombre_producto" },
          { title: "Cantidad", dataIndex: "total_cantidad_vendida" },
          { title: "Precio", dataIndex: "precio" },
        ]}
        dataSource={[...(data || [])]
          .sort((a, b) => b.total_cantidad_vendida - a.total_cantidad_vendida)
          .map((item) => ({ ...item, key: item.nombre_producto }))} // Usar un campo único como key
        pagination={false}
        loading={loading}
      />
    </Card>
  );
}

export default Tabla;
