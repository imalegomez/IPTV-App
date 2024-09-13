import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
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

    searchIcon: { //boton buscador
      marginRight: 8,
    },

    searchContainer: {  // contenedor de boton y buscador
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#dee2e6',
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 16,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 1, // Solo para Android

    },

    searchInput: { //texto dentro del buscador
      flex: 1,
      fontSize: 16,
      color: '#212529',
    },
  });