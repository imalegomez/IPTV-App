import { StyleSheet } from "react-native";

export default StyleSheet.create({
    categoryTitle: {
        flexDirection: 'row',
        left: 20,
        color: '#000',
        fontSize: 25,
        marginVertical: 10,
        fontWeight: 'bold',
      },
      scrollButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
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
        borderRadius: 15,
        borderColor: '#dee2e6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
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
})