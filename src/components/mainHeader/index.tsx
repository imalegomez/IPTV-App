import React from "react";
import styles from "./styles";
import { View, Text } from "react-native";

export const MainHeader = React.memo(() => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>D'sol TV</Text>
    </View>
  );
});
