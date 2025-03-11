import React from "react";
import PropTypes from "prop-types";
import { Modal, Table } from "antd";

function VentaDetalleModal({ visible, onClose, venta }) {
  const detalleColumns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Precio",
      dataIndex: "precio_venta",
      key: "precio_venta",
    },
  ];

  return (
    <Modal
      open={visible}
      title={
        venta
          ? `Detalle de la Venta #${venta.id_venta} - Factura: ${venta.numero_factura}`
          : "Detalle de la Venta"
      }
      onCancel={onClose}
      footer={null}
    >
      {venta && venta.detalles_venta && venta.detalles_venta.length > 0 ? (
        <Table
          dataSource={venta.detalles_venta}
          columns={detalleColumns}
          rowKey="id_detalle_venta"
          pagination={false}
        />
      ) : (
        <p>No hay detalles disponibles para esta venta.</p>
      )}
    </Modal>
  );
}

// Definición de PropTypes para validación (opcional pero recomendado)
VentaDetalleModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  venta: PropTypes.shape({
    id_venta: PropTypes.number,
    numero_factura: PropTypes.string,
    detalles_venta: PropTypes.arrayOf(
      PropTypes.shape({
        id_detalle_venta: PropTypes.number,
        id_venta: PropTypes.number,
        id_producto: PropTypes.number,
        nombre: PropTypes.string,
        quantity: PropTypes.number,
        precio_venta: PropTypes.number,
        fecha_detalle: PropTypes.string,
      })
    ),
  }),
};

VentaDetalleModal.defaultProps = {
  venta: null,
};

export default VentaDetalleModal;
