import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headerContainer: {
      backgroundColor: "rgba(51, 51, 51, 0.8)", // Color de fondo con transparencia
      padding: 20,
      alignItems: "center",
      overflow: "hidden",
      flexDirection: "row",
      height: 80,
    },
    headerText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      position: "absolute",
      left: 10,
    },
  });