import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headerContainerMobile: {
      backgroundColor: 'rgba(51, 51, 51, 0.8)',
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 75,
    },
    headerContainerWeb: {
      backgroundColor: '#000',
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 30,
      marginLeft: 20,  // Espaciado entre los botones
      padding: 10,  // Agrega padding para aumentar la caja
      transition: 'all 0.1s ease',  // Transición suave
      flexGrow: 1,
      borderRadius: 5,
    },
    navText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: 5,  // Espacio entre el ícono y el texto
    },
    headerText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,  // Esto hace que el texto del título esté centrado
    },
    searchIcon: {
      padding: 5,
    },
    navButtonHovered: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 13,
      transform: 'scale(1.05)',
    },
  });