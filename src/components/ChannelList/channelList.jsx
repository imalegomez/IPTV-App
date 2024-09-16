import React, { useState } from 'react';
import { View, FlatList, Text, Platform } from 'react-native';
import AnimatedChannel from '../AnimatedChannel/AnimatedChannel';
import SearchBar from '../SearchBar/searchBar'; // Importa el componente SearchBar
import styles from './styles';

const ChannelList = ({ channels, onSelectChannel }) => {
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda

  // Filtrar canales según el texto de búsqueda
  const filteredChannels = Object.keys(channels).reduce((acc, category) => {
    const filtered = channels[category].filter(channel =>
      channel.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && <SearchBar searchText={searchText} onSearch={setSearchText} />} 
      {searchText && Object.keys(filteredChannels).length === 0 ? (
        <Text style={styles.errorText}>No se encontraron canales.</Text>
      ) : (
        <FlatList
          data={Object.keys(filteredChannels)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <AnimatedChannel
              category={item}
              channels={filteredChannels[item]} // Utiliza los canales filtrados
              onSelectChannel={onSelectChannel}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      )}
    </View>
  );
};

export default React.memo(ChannelList);
