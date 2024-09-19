import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import Category from '../Category/Category';

const AnimatedChannel = React.memo(({ category, channels, onSelectChannel }) => {
  const animationConfig = useRef({
    fadeAnim: new Animated.Value(0),
    translateY: new Animated.Value(20),
    scale: new Animated.Value(0.9)
  }).current;

  const animatedStyle = useMemo(() => ({
    opacity: animationConfig.fadeAnim,
    transform: [
      { translateY: animationConfig.translateY },
      { scale: animationConfig.scale }
    ]
  }), [animationConfig]);

  useEffect(() => {
    const animation = Animated.parallel(
      Object.entries(animationConfig).map(([key, value]) =>
        Animated.timing(value, {
          toValue: key === 'translateY' ? 0 : 1,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      )
    );

    animation.start();

    return () => animation.stop();
  }, [animationConfig]);

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
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
      },
    }),
  },
};

export default AnimatedChannel;