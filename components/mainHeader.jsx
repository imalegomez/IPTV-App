import React, {useState} from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


const MainHeader = () =>{
 const [searchText, setSearchText] = useState('');

  const handleSearchPress = () => {
    setIsSearching(!isSearching);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    onSearch(text); // Actualiza el texto de búsqueda en Main
  };
    return(
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>D'sol TV</Text>
          {(Platform.OS !== 'android' && Platform.OS !== 'ios')&&( 
            <Pressable style= {styles.searchIcon} onPress={handleSearchPress}>
              <AntDesign name="search1" size={24} color="white" />
            </Pressable>)}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'rgba(51, 51, 51, 0.8)', // Color de fondo con transparencia
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      searchIcon: {
        padding: 5
      }
})

export default React.memo(MainHeader)