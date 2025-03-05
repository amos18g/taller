"use client"
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import Header from './Header';
import TablaFactura from './TablaFactura';
import Total from './TotalFactura';

// Componente para el documento PDF
const MyDocument = ({ empresa, fecha, hora, totalGeneral, comprasData }) => {
  
  console.log("La info de la compra es:", comprasData);

  return (
    <Document>
      <Page style={{ padding: 30, fontSize: 12 }}>
        <Header empresa={empresa} fecha={fecha} hora={hora} />
        <TablaFactura comprasData={comprasData} />
        <Total totalGeneral={totalGeneral} />
      </Page>
    </Document>
  );
};

export default MyDocument;
