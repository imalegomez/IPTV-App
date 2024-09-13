import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, // Espacio entre categorías
    paddingHorizontal: 10, // Espacio lateral
    backgroundColor: '#fff', // Fondo blanco para la categoría
    borderRadius: 8, // Bordes redondeados
    shadowColor: '#000', // Sombra para el efecto de profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
});

export default styles;
