
import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import dayjs from "dayjs";


const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logoSection: {
    flexDirection: "column",
    gap: 2,
  },
  logo: {
    width: 80,
    height: 60,
    marginBottom: 5,
  },
  infoSection: {
    fontSize: 10,
    textAlign: "right",
  },
  facturaNumero: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
  },
  customerBox: {
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 2,
    marginBottom: 10,
  },
  customerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 6,
  },
  customerText: {
    flex: 1,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#f0f0f0",
    padding: 5,
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    textAlign: "center",
  },
  summaryBox: {
    alignSelf: "flex-end",
    width: 200,
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});

const InvoiceDocument = ({ venta }) => (
  <Document>
    <Page style={styles.page}>
      {/* Header con logo y datos */}
      <View style={styles.headerRow}>
        <View style={styles.logoSection}>
          <Image style={styles.logo}  src="/img/taller-logo.png" />
          <Text>Dirección: Tegucigalpa Calle 34V 123-10 </Text>
          <Text>Teléfono: 504 9847 24578</Text>
        </View>
        <View style={styles.infoSection}>
          <Text>Taller Emanuel</Text>
          <Text style={styles.facturaNumero}>FACTURA N. {venta.numero_factura}</Text>
        </View>
      </View>

      {/* Cliente */}
      <View style={styles.customerBox}>
        <View style={styles.customerRow}>
          <Text style={styles.customerText}>Cliente: {venta.cliente || "-"}</Text>
          <Text style={styles.customerText}>Fecha: {dayjs(venta.fecha).format("YYYY-MM-DD")}</Text>
        </View>
      </View>

      {/* Tabla */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableColHeader}>Producto</Text>
          <Text style={styles.tableColHeader}>Cantidad</Text>
          <Text style={styles.tableColHeader}>Valor Unit.</Text>
          <Text style={styles.tableColHeader}>Valor Total</Text>
        </View>

        {venta.detalles_venta.map((detalle, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol}>{detalle.nombre}</Text>
            <Text style={styles.tableCol}>{detalle.quantity}</Text>
            <Text style={styles.tableCol}>L.{detalle.precio_venta.toFixed(2)}</Text>
            <Text style={styles.tableCol}>L.{(detalle.quantity * detalle.precio_venta).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Resumen */}
      <View style={styles.summaryBox}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, { width: "50%", textAlign: "left" }]}>Neto:</Text>
          <Text style={[styles.tableCol, { width: "50%" }]}>L.{venta.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, { width: "50%", textAlign: "left" }]}>Impuesto:</Text>
          <Text style={[styles.tableCol, { width: "50%" }]}>L.{venta.impuesto.toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, { width: "50%", textAlign: "left" }, styles.bold]}>Total:</Text>
          <Text style={[styles.tableCol, { width: "50%" }, styles.bold]}>L.{venta.total.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;