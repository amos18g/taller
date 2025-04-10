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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 70,
    marginLeft: 10,
    borderRadius:150,
  },
  infoSection: {
    fontSize: 10,
    textAlign: "left",
    flex: 1,
  },
  facturaNumero: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
    marginTop: 5,
  },
  customerBox: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  customerColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  customerColumn: {
    flex: 1,
    paddingRight: 10,
  },
  customerText: {
    marginBottom: 4,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#000",
    backgroundColor: "#e9f2ff",
    padding: 5,
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#000",
    padding: 5,
    textAlign: "center",
  },
  summaryBox: {
    alignSelf: "flex-end",
    width: 260,
    marginTop: 20,
    borderWidth: 0.5,
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
        {/* Info de la empresa a la izquierda */}
        <View style={styles.infoSection}>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>Taller Emanuel</Text>
          <Text>Dirección: Tegucigalpa Calle 34V 123-10</Text>
          <Text>Teléfono: 504 9847 24578</Text>
          <Text style={styles.facturaNumero}>FACTURA N. {venta.numero_factura}</Text>
        </View>
        <Image style={styles.logo} src="/img/Taller.jpg" />
      </View>
      {/* Datos del Cliente */}
      <View style={styles.customerBox}>
        <View style={styles.customerColumns}>
          <View style={styles.customerColumn}>
            <Text style={styles.customerText}>
              Cliente: {venta.cliente?.nombre || "-"}
            </Text>
            <Text style={styles.customerText}>
              RTN: {venta.cliente?.rtn || "-"}
            </Text>
            <Text style={styles.customerText}>
              Correo: {venta.cliente?.correo || "-"}
            </Text>
          </View>
          <View style={styles.customerColumn}>
            <Text style={styles.customerText}>
              Fecha: {venta.fecha ? dayjs(venta.fecha).format("YYYY-MM-DD") : "-"}
            </Text>
            <Text style={styles.customerText}>
              Identidad: {venta.cliente?.identidad || "-"}
            </Text>
          </View>
        </View>
      </View>
      {/* Tabla de productos */}
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
            <Text style={styles.tableCol}>
              L.{(detalle.quantity * detalle.precio_venta).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
      {/* Resumen */}
      <View style={styles.summaryBox}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, { width: "50%", textAlign: "left" }]}>Neto:</Text>
          <Text style={[styles.tableCol, { width: "50%" }]}>
            L.{venta.subtotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, { width: "50%", textAlign: "left" }]}>Impuesto:</Text>
          <Text style={[styles.tableCol, { width: "50%" }]}>
            L.{venta.impuesto.toFixed(2)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCol,
              { width: "50%", textAlign: "left" },
              styles.bold,
            ]}
          >
            Total:
          </Text>
          <Text style={[styles.tableCol, { width: "50%" }, styles.bold]}>
            L.{venta.total.toFixed(2)}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InvoiceDocument;