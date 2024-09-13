import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    //backgroundColor: 'black', // Puedes cambiar el color de fondo si lo deseas
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center', // Asegura que el video también esté centrado
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  });