// components/InvoiceDocument.jsx
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import dayjs from "dayjs";

// Definición de estilos mejorados para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    width: 130,
  },
  value: {
    flex: 1,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    padding: 5,
    textAlign: "center",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    textAlign: "center",
  },
  tableCellHeader: {
    fontSize: 11,
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
  },
});

const InvoiceDocument = ({ venta }) => (
  <Document>
    <Page style={styles.page}>
      {/* Encabezado con logo y título */}
      <View style={styles.headerContainer}>
        <Image style={styles.logo} src="https://via.placeholder.com/60" />
        <Text style={styles.headerText}>Factura de Venta</Text>
      </View>

      {/* Sección de datos de la venta */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Número de Factura:</Text>
          <Text style={styles.value}>{venta.numero_factura}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{dayjs(venta.fecha).format("DD/MM/YYYY HH:mm:ss")}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>ID Cliente:</Text>
          <Text style={styles.value}>{venta.id_cliente}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Método de Pago:</Text>
          <Text style={styles.value}>{venta.metodo_pago}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Observaciones:</Text>
          <Text style={styles.value}>{venta.observaciones || "-"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>{venta.subtotal}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{venta.total}</Text>
        </View>
      </View>

      {/* Tabla de detalles de la venta */}
      {venta.detalles_venta && venta.detalles_venta.length > 0 && (
        <View style={styles.table}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Producto</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Cantidad</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Precio</Text>
            </View>
          </View>
          {/* Cuerpo de la tabla */}
          {venta.detalles_venta.map((detalle, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{detalle.nombre}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{detalle.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{detalle.precio_venta}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default InvoiceDocument;
