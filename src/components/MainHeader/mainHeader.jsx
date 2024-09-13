import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import styles from "./styles";

const MainHeader = () => {
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredLiveTV, setIsHoveredLiveTV] = useState(false);

  return (
    <View style={Platform.OS === 'web' ? styles.headerContainerWeb : styles.headerContainerMobile}>
      {(Platform.OS === 'web') && (
        <View style={styles.leftContainer}>
          <Link href={{pathname: '/'}}>
          <Pressable 
            onMouseEnter={() => setIsHoveredHome(true)}
            onMouseLeave={() => setIsHoveredHome(false)}
            style={[
              styles.navButton,
              isHoveredHome && styles.navButtonHovered
            ]}
          >
            <Feather name="home" size={20} color="white" />
            <Text style={styles.navText}>Home</Text>
          </Pressable>
          </Link>
          <Pressable 
            onMouseEnter={() => setIsHoveredLiveTV(true)}
            onMouseLeave={() => setIsHoveredLiveTV(false)}
            style={[
              styles.navButton,
              isHoveredLiveTV && styles.navButtonHovered
            ]}
          >
            <Feather name="tv" size={20} color="white" />
            <Text style={styles.navText}>Live TV</Text>
          </Pressable>
        </View>
      )}
      {(Platform.OS === 'web') && (
        <Pressable style={styles.searchIcon}>
          <AntDesign name="search1" size={24} color="white" />
        </Pressable>
      )}
      {
        (Platform.OS !=='web') && (
          <Text style={styles.headerText}>D'Sol TV</Text>
        )
      }
    </View>
  );
}



export default React.memo(MainHeader);
