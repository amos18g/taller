import { Card, Table, Typography } from "antd";


function Tabla({data}) {
  return (
    <Card>
      <Typography.Text>Productos más vendidos</Typography.Text>
      <Table
        columns={[
          { title: "Nombre", dataIndex: "nombre" },
          { title: "Cantidad", dataIndex: "cantidad" },
          { title: "Precio", dataIndex: "precio" },
        ]}
        dataSource={data}
        pagination={false}
      />
    </Card>
  );
}

export default Tabla;
