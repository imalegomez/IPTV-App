// Header.js
import React, { FC } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "./styles";

interface ChannelHeaderProps {
  title: string;
}

export const ChannelHeader: FC<ChannelHeaderProps> = React.memo(({ title }) => {
  const router = useRouter();

  const handleBackPress = () => {
    router.push("/"); // Cambia a la ruta del índice
  };

  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <AntDesign name="close" size={24} color="white" />
      </Pressable>
      <Text style={styles.headerText}>Estás viendo: {title}</Text>
    </View>
  );
});
