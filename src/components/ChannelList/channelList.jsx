import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import AnimatedChannel from '../AnimatedChannel/AnimatedChannel';
import styles from './styles';

const ChannelList = ({ channels, onSelectChannel }) => {
  const [searchText, setSearchText] = useState('');

  const filteredChannels = useMemo(() => {
    if (!searchText) return channels;
    return Object.entries(channels).reduce((acc, [category, categoryChannels]) => {
      const filtered = categoryChannels.filter(channel =>
        channel.title.toLowerCase().includes(searchText.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
      return acc;
    }, {});
  }, [channels, searchText]);

  const renderItem = useCallback(({ item }) => (
    <AnimatedChannel
      category={item}
      channels={filteredChannels[item]}
      onSelectChannel={onSelectChannel}
    />
  ), [filteredChannels, onSelectChannel]);

  const keyExtractor = useCallback((item) => item, []);

  return (
    <View style={styles.container}>
      {Object.keys(filteredChannels).length === 0 ? (
        <Text style={styles.errorText}>No se encontraron canales.</Text>
      ) : (
        <FlatList
          data={Object.keys(filteredChannels)}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      )}
    </View>
  );
};

export default React.memo(ChannelList);