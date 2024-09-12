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
        <Feather name="home" style={styles.navItem}/>
      </Pressable>
      <Pressable onPress={() => router.push('/search')}>
        <Feather name="compass" style={styles.navItem} />
      </Pressable>
      <Pressable onPress={() => router.push('/bookmark')}>
        <AntDesign name="book" style={styles.navItem}/>
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
    height: 55
  },
  navItem: {
    flexDirection:'row',
    color: '#fff',
    fontSize: 30,
  },
});

export default React.memo(BottomNav);
