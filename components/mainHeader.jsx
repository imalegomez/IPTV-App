import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const MainHeader = () => {
  const [searchText, setSearchText] = useState('');
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredLiveTV, setIsHoveredLiveTV] = useState(false);

  const handleSearchPress = () => {
    setIsSearching(!isSearching);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    onSearch(text); // Actualiza el texto de búsqueda en Main
  };

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

const styles = StyleSheet.create({
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

export default React.memo(MainHeader);
