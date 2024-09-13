import React, { useState, useEffect, useRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter } from 'expo-router';
import ChannelHeader from '../ChannelHeader/channelHeader';
import styles from './styles';

const VideoPlayer = ({ selectedChannel, onExitVideo }) => {
  const videoRef = useRef(null);
  const [showHeader, setShowHeader] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
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
        setShowHeader(false);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [lastInteraction]);

  const handleScreenTap = () => {
    setShowHeader(true);
    setLastInteraction(Date.now());
  };

  return (
    <Pressable onPress={handleScreenTap} style={styles.container}>
      {showHeader && (
        <ChannelHeader
          title={typeof selectedChannel?.title === 'string' ? selectedChannel.title : "Sin título"}
          onExit={onExitVideo} // Pasa la función aquí
        />
      )}
      <View style={styles.videoContainer}>
        {Platform.OS === 'web' ? (
          <video ref={videoRef} style={styles.video} controls autoPlay />
        ) : (
          <>
            <StatusBar hidden />
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
                  onExitVideo(); // Llama a la función de salida
                }
              }}
            />
          </>
        )}
      </View>
    </Pressable>
  );
};

export default React.memo(VideoPlayer);
