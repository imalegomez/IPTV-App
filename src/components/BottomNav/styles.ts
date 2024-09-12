import { StyleSheet } from "react-native";
import { colors } from "../../constans/Colors";

export default StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: colors.grayCustom,
        paddingVertical: 10,
    },
    navItem: {
        color: colors.white,
        fontSize: 16,
    },
})