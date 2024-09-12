// BottomNav.jsx
import React from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "./styles";
import { colors } from "../../constans/Colors";

export const BottomNav = React.memo(() => {
  const router = useRouter();

  return (
    <View style={styles.navContainer}>
      <Pressable onPress={() => router.push("/")}>
        <Feather name="home" size={24} color={colors.white} />
      </Pressable>
      <Pressable onPress={() => router.push("/search")}>
        <Feather name="compass" size={24} color={colors.white} />
      </Pressable>
      <Pressable onPress={() => router.push("/bookmark")}>
        <AntDesign name="book" size={24} color={colors.white} />
      </Pressable>
    </View>
  );
});
