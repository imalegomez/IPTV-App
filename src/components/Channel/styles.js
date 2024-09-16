import { StyleSheet } from "react-native";

export default StyleSheet.create({
    logo: {
        width: 100, // Tamaño más pequeño del logo
        height: 100,
        borderRadius: 5,
        marginBottom: 5, // Espacio entre el logo y el texto
        borderRadius: 50,
        backgroundColor: '#fff',
        borderColor: '#000',
      },
      logoWeb: {
        width: 30,
        height: 30,
        borderRadius: 5,
        marginBottom: 5,
         
      },
      itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
        width: 100,
      },
  
      channel: {
        color: '#000',
        fontSize: 14, // Ajusta el tamaño del texto si es necesario
        textAlign: 'center',
      },
})