import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Estilos para la tabla
const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: 'black',
    color: '#fff',
    fontWeight: 'bold',
    padding: 5,
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    padding: 5,
    flex: 1,
    textAlign: 'center',
  },
});

const TablaFactura = ({ comprasData }) => (
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={styles.tableHeader}>Fecha</Text>
      <Text style={styles.tableHeader}>ID</Text>
      <Text style={styles.tableHeader}>Proveedor</Text>
      <Text style={styles.tableHeader}>Cantidad</Text>
      <Text style={styles.tableHeader}>Costo Unit.</Text>
      <Text style={styles.tableHeader}>Costo Total</Text>
      <Text style={styles.tableHeader}>Factura</Text>
    </View>

    {comprasData.map((item) => (
      <View style={styles.tableRow} key={item.id_historial}>
        <Text style={styles.tableCell}>{new Date(item.fecha_compra).toLocaleDateString()}</Text>
        <Text style={styles.tableCell}>{item.id_historial}</Text>
        <Text style={styles.tableCell}>{item.proveedor || 'N/A'}</Text>
        <Text style={styles.tableCell}>{item.cantidad_comprada}</Text>
        <Text style={styles.tableCell}>${item.costo_unitario}</Text>
        <Text style={styles.tableCell}>${item.costo_total}</Text>
        <Text style={styles.tableCell}>{item.numero_factura || 'N/A'}</Text>
      </View>
    ))}
  </View>
);

export default TablaFactura;
