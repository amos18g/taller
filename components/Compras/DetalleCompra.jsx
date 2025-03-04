"use client"
import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import MyDocument from '../../components/Compras/Factura/Document';
import { useCompras } from '../../hooks/useCompras';  

function DetalleCompra() {
  const { buscarCompra, loading, error } = useCompras();  
  const [compraData, setCompraData] = useState(null);
  const empresa = 'Mi Empresa S.A.';


  useEffect(() => {
    const idCompra = 2;  
    const fetchCompra = async () => {
      const compra = await buscarCompra(idCompra); 
      setCompraData(compra);  
    };

    fetchCompra();
  }, []);  

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!compraData) {
    return <div>No se encontró la compra.</div>;
  }

  const totalGeneral = compraData.costo_total;  // Asumiendo que `costo_total` es el total de la compra

  return (
    <div className="container mx-auto p-4">
      {/* Botón para ver PDF en nueva pestaña */}
      <BlobProvider
        document={
          <MyDocument
            empresa={empresa}
            fecha={compraData.fecha_compra}
            totalGeneral={totalGeneral}
            comprasData={[compraData]}  // Le pasamos la compra como un array
          />
        }
      >
        {({ blob, url, loading }) => (
          <button
            onClick={() => url && window.open(url, '_blank')}
            disabled={loading}
            className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Generando PDF...' : 'Ver PDF en nueva pestaña'}
          </button>
        )}
      </BlobProvider>
    </div>
  );
}

export default DetalleCompra;
