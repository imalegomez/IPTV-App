import React from 'react';
import { View, FlatList, Text } from 'react-native';
import AnimatedChannel from '../AnimatedChannel/AnimatedChannel';
import styles from './styles';

const ChannelList = ({ channels, onSelectChannel }) => {
  if (Object.keys(channels).length === 0) {
    return <Text style={styles.errorText}>No hay canales disponibles.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(channels)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <AnimatedChannel
            category={item}
            channels={channels[item]}
            onSelectChannel={onSelectChannel}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

export default React.memo(ChannelList);
