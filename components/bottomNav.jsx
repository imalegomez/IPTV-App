// BottomNav.jsx
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

const BottomNav = () => {
  const router = useRouter();

  return (
    <View style={styles.navContainer}>
      <Pressable onPress={() => router.push('/')}>
        <Feather name="home" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => router.push('/search')}>
        <Feather name="compass" size={24} color="white" />
      </Pressable>
      <Pressable onPress={() => router.push('/bookmark')}>
        <AntDesign name="book" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 10,
  },
  navItem: {
    color: '#fff',
    fontSize: 16,
  },
});

export default React.memo(BottomNav);
