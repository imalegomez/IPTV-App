import React from 'react';
import { Pressable, Image, Text, Platform } from 'react-native';
import styles from './styles';

const Channel = ({ channel, onSelectChannel }) => (
  <Pressable onPress={() => onSelectChannel(channel)} style={styles.itemContainer}>
    {channel.logo && (
      <Image source={{ uri: channel.logo }} style={Platform.OS === 'web' ? styles.logoWeb : styles.logo} resizeMode='contain' />
    )}
    <Text style={styles.channel}>{channel.title}</Text>
  </Pressable>
);

export default React.memo(Channel);
