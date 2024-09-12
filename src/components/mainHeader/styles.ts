import { StyleSheet } from "react-native";
import { backgrounds } from "../../constans/Colors";

export default StyleSheet.create({
    headerContainer: {
      backgroundColor: backgrounds.mainHeader, // Color de fondo con transparencia
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