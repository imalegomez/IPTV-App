import React, { useMemo } from 'react';
import { View, Pressable, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Feather, AntDesign } from '@expo/vector-icons';

import styles from './styles';

const NAV_ITEMS = [
  { route: '/', icon: 'home', label: 'Inicio', IconComponent: Feather },
  { route: '/liveTv', icon: 'compass', label: 'Explorar', IconComponent: Feather },
  { route: '/bookmark', icon: 'book', label: 'Guardados', IconComponent: AntDesign },
];

const NavItem = ({ route, icon, label, IconComponent }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === route;
  
  const handlePress = () => router.push(route);

  return (
    <Pressable onPress={handlePress} style={styles.navItem}>
      <IconComponent 
        name={icon} 
        style={[styles.navIcon, isActive && styles.navIconActive]} 
      />
      <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
};

const BottomNav = () => {
  const navItems = useMemo(() => NAV_ITEMS.map((item, index) => (
    <NavItem key={index} {...item} />
  )), []);

  return (
    <View style={styles.navContainer}>
      {navItems}
    </View>
  );
};

export default React.memo(BottomNav);