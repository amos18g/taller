import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

// Estilos para el total
const styles = StyleSheet.create({
  total: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
});

const Total = ({ totalGeneral }) => (
  <Text style={styles.total}>Total General: ${totalGeneral}</Text>
);

export default Total;
