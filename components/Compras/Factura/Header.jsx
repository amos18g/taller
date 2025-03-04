import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

// Estilos para el Header
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 3,
  },
});

const Header = ({ empresa, fecha, hora }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{empresa}</Text>
    <Text style={styles.subtitle}>Fecha: {fecha}</Text>
    <Text style={styles.subtitle}>Hora: {hora}</Text>
  </View>
);

export default Header;
