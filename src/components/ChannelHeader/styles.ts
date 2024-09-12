import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headerContainer: {
        padding: 20,
        backgroundColor: "transparent",
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        left: 10,
        zIndex: 1,
    },
});