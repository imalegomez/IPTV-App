// BottomNav.jsx
import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import styles from './styles';
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

export default React.memo(BottomNav);
