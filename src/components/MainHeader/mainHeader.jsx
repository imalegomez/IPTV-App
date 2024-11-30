import React, { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import {AntDesign, Feather} from '@expo/vector-icons';
import styles from "./styles";
import SearchBar from "../SearchBar/searchBar"; 

const MainHeader = ({ onSearch }) => { // Recibe la función onSearch como prop
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredLiveTV, setIsHoveredLiveTV] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text); // Llama a la función onSearch pasada como prop
    }
  };

  return (
    <View style={Platform.OS === 'web' ? styles.headerContainerWeb : styles.headerContainerMobile}>
      {(Platform.OS === 'web') && (
        <View style={styles.leftContainer}>
          <Link href={{ pathname: '/' }}>
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
          <Link href={{ pathname : '/liveTv'}}>
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
          </Link>
          <SearchBar searchText={searchText} onSearch={handleSearch} /> {/* Pasa la función handleSearch */}
        </View>
      )}
      {(Platform.OS === 'web') && (
        <Pressable style={styles.searchIcon}>
          <AntDesign name="search1" size={24} color="white" />
        </Pressable>
      )}
      {
        (Platform.OS !== 'web') && (
          <Text style={styles.headerText}>D'Sol TV</Text>
        )
      }
    </View>
  );
}

export default React.memo(MainHeader);
