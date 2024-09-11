// MainHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const MainHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Mi Aplicación</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#333', // Color de fondo del encabezado
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Evita que se muestren elementos fuera de su área
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MainHeader;
