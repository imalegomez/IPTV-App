import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, Easing } from 'react-native';
import Category from '../Category/Category';

const AnimatedChannel = React.memo(({ category, channels, onSelectChannel }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const animatedStyle = useMemo(() => ({
    opacity: fadeAnim,
    transform: [{ translateY }]
  }), [fadeAnim, translateY]);

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [fadeAnim, translateY]);

  return (
    <Animated.View style={animatedStyle}>
      <Category category={category} channels={channels} onSelectChannel={onSelectChannel} />
    </Animated.View>
  );
});

AnimatedChannel.displayName = 'AnimatedChannel';

export default AnimatedChannel;