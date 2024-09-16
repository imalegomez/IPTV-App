import React from 'react';
import { View, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './styles'; // Asegúrate de que las estilos están disponibles

const SearchBar = ({ searchText, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <AntDesign name="search1" size={20} color="black" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar canales..."
        value={searchText}
        onChangeText={onSearch}
      />
    </View>
  );
};

export default React.memo(SearchBar);
