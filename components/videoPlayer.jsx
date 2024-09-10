// VideoPlayer.js
import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Pressable, Text} from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import Hls from 'hls.js';

const VideoPlayer = ({ selectedChannel, onExitVideo }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Solo en la web: configuramos Hls.js si es necesario
    if (selectedChannel && Platform.OS === 'web' && videoRef.current) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            //const proxiedUrl = `http://localhost:8081/stream/${selectedChannel.url}`; // Usamos el proxy
            hls.loadSource(selectedChannel.url);
            hls.attachMedia(videoRef.current);
          } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = selectedChannel.url;
          }
    }

    // En dispositivos móviles: bloquear orientación en landscape
    const lockOrientation = async () => {
      if (Platform.OS !== 'web') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      }
    };
    lockOrientation();

    return () => {
      // Restablecer orientación en portrait al salir del video
      const unlockOrientation = async () => {
        if (Platform.OS !== 'web') {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
      };
      unlockOrientation();
    };
  }, [selectedChannel]);

  return (
    <>
      <Pressable onPress={onExitVideo} style={styles.backButton}>
        <Text style={styles.backText}>Volver</Text>
      </Pressable>
      {Platform.OS === 'web' ? (
        <video ref={videoRef} style={styles.video} controls autoPlay />
      ) : (
        <Video
          ref={videoRef}
          source={{ uri: selectedChannel.url }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls
          style={styles.video}
          onFullscreenUpdate={({ fullscreenUpdate }) => {
            if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS) {
              onExitVideo();
            }
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 300,
  },
  backButton: {
    marginTop: 10,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default VideoPlayer;