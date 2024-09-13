import React, { useRef,useCallback } from 'react';
import { View, Text, Pressable, ScrollView, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Channel from '../Channel/Channel';
import styles from './styles';

const Category = ({ category, channels, onSelectChannel }) => {
  const scrollRef = useRef();

  const handleScroll = useCallback((direction) => {
    if (Platform.OS === 'web' && scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollTo({ x: scrollRef.current.scrollLeft + scrollAmount, animated: true });
    }
  }, []);

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.horizontalContainer}>
        {Platform.OS === 'web' && (
          <Pressable onPress={() => handleScroll('left')} style={styles.scrollButton}>
            <AntDesign name="leftcircleo" size={24} color="black" />
          </Pressable>
        )}
        <ScrollView
          horizontal
          ref={scrollRef}
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
        >
          {channels.map((channel, index) => (
            <View key={index} style={Platform.OS === 'web' ? styles.channelWrapperWeb : styles.channelWrapper}>
              <Channel channel={channel} onSelectChannel={onSelectChannel} />
            </View>
          ))}
        </ScrollView>
        {Platform.OS === 'web' && (
          <Pressable onPress={() => handleScroll('right')} style={styles.scrollButton}>
            <AntDesign name="rightcircleo" size={24} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default React.memo(Category);
