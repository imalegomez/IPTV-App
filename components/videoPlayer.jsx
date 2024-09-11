import React, { useState, useEffect, useRef } from 'react';
import { Platform, StyleSheet, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Hls from 'hls.js';
import ChannelHeader from './channelHeader';

const VideoPlayer = ({ selectedChannel, onExitVideo }) => {
  const videoRef = useRef(null);
  const [showHeader, setShowHeader] = useState(false); // Estado para mostrar el Header
  const [lastInteraction, setLastInteraction] = useState(Date.now()); // Estado para registrar la última interacción
  const hideHeaderTimeout = useRef(null); // Usar un ref para el timeout

  const handleMouseMove = () => {
    setShowHeader(true);
    if (hideHeaderTimeout.current) {
      clearTimeout(hideHeaderTimeout.current);
    }
    hideHeaderTimeout.current = setTimeout(() => {
      setShowHeader(false);
    }, 3000);
  };

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (Platform.OS === 'web') {
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(hideHeaderTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedChannel && Platform.OS === 'web' && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(selectedChannel.url);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = selectedChannel.url;
      }
    }

    const lockOrientation = async () => {
      if (Platform.OS !== 'web') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    };
    lockOrientation();

    return () => {
      const unlockOrientation = async () => {
        if (Platform.OS !== 'web') {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
      };
      unlockOrientation();
    };
  }, [selectedChannel]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Date.now() - lastInteraction > 3000) {
        setShowHeader(false); // Ocultar el Header después de 3 segundos de inactividad
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [lastInteraction]);

  const handleScreenTap = () => {
    setShowHeader(true); // Mostrar el Header al hacer tap
    setLastInteraction(Date.now()); // Actualizar la última interacción
  };

  return (
    <Pressable onPress={handleScreenTap} style={styles.container}>
  {showHeader && (
    <ChannelHeader title={typeof selectedChannel?.title === 'string' ? selectedChannel.title : "Sin título"} />
  )}
  <View style={styles.videoContainer}>
    {Platform.OS === 'web' ? (
      <video ref={videoRef} style={styles.video} controls autoPlay />
    ) : (
      <>
          <StatusBar hidden/>
          <Video
            ref={videoRef}
            source={{ uri: selectedChannel.url }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="stretch"
            shouldPlay
            style={styles.video}
            onFullscreenUpdate={({ fullscreenUpdate }) => {
              if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS) {
                onExitVideo();
              }
            }}
          />
          </>
    )}
  </View>
</Pressable>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
});

export default React.memo(VideoPlayer);
