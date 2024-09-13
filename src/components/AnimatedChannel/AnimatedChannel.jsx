// AnimatedChannel.jsx
import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Category from '../Category/Category';

const AnimatedChannel = ({ category, channels, onSelectChannel }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial para la animación
  const translateY = new Animated.Value(20); // Valor inicial para el movimiento en Y

  useEffect(() => {
    // Animar desvanecimiento y movimiento cuando el componente se monta
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Cambiar a opacidad total
        duration: 500, // Duración de la animación
        easing: Easing.out(Easing.ease), 
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, // Volver a la posición original
        duration: 500,
        easing: Easing.out(Easing.ease), // Ajustar la curva de animación
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform:[{translateY}] }}>
      <Category category={category} channels={channels} onSelectChannel={onSelectChannel} />
    </Animated.View>
  );
};

export default React.memo(AnimatedChannel);
