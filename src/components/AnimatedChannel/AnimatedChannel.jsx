import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, Easing, Platform, View, Text } from 'react-native';
import Category from '../Category/Category';

const AnimatedChannel = React.memo(({ category, channels, onSelectChannel }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const scale = useRef(new Animated.Value(0.9)).current; // Agregar escala

  const animatedStyle = useMemo(() => ({
    opacity: fadeAnim,
    transform: [
      { translateY },
      { scale } // Añadir transformación de escala
    ]
  }), [fadeAnim, translateY, scale]);

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700, // Aumentar la duración para mayor suavidad
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700, // Aumentar la duración para mayor suavidad
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1, // Hacer que la escala vuelva a 1
        duration: 700,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [fadeAnim, translateY, scale]);

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <Category category={category} channels={channels} onSelectChannel={onSelectChannel} />
    </Animated.View>
  );
});

AnimatedChannel.displayName = 'AnimatedChannel';

const styles = {
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Añadir sombra para Android y web
    ...(Platform.OS === 'web' && {
      transition: 'all 0.3s ease-in-out', // Para transiciones suaves en web
      cursor: 'pointer', // Añadir puntero en PC para mejorar la UX
    }),
  },
};

export default AnimatedChannel;
