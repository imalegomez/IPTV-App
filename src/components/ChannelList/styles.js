import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    categoryContainer: {
      marginBottom: 20,
    },
    horizontalContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    scrollViewContent: {
      flexDirection: 'row',
      flexGrow: 1,
    },
    channelWrapper: {
      flex: 1,
      margin: 10,
    },
    channelWrapperWeb: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      margin: 10, // Ajusta el margen según necesites
      borderColor: 'lightgray', // Borde gris solo en web
      width: 250, // Mantener el ancho fijo
      height: 150, // Asegurarte que el alto sea igual al ancho para que sea cuadrada
      borderRadius: 8,
    },
    scrollButton: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      padding: 10,
      borderRadius: 5,
      width: 100,
    },
    logo: {
      width: 60, // Tamaño más pequeño del logo
      height: 60,
      borderRadius: 5,
      marginBottom: 5, // Espacio entre el logo y el texto
    },
    logoWeb: {
      width: 30,
      height: 30,
      borderRadius: 5,
      marginBottom: 5, 
    },
    channel: {
      color: '#000',
      fontSize: 14, // Ajusta el tamaño del texto si es necesario
      textAlign: 'center',
    },
    categoryTitle: {
      flexDirection: 'row',
      left: 20,
      color: '#000',
      fontSize: 25,
      marginVertical: 10,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      margin: 20,
    },
    categoriesList: {
      paddingBottom: 20,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    buscador:{
      
    }
  });