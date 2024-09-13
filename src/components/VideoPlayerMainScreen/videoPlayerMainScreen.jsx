import React, { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Video } from 'expo-av';
import Hls from 'hls.js';

import styles from './styles';

const VideoPlayerMainScreen = ({ selectedChannel, onExitVideo }) => {
  const videoRef = useRef(null);
  //const [showHeader, setShowHeader] = useState(false); // Estado para mostrar el Header
  //const hideHeaderTimeout = useRef(null); // Usar un ref para el timeout

  useEffect(() => {
    if (selectedChannel && Platform.OS === 'web' && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(selectedChannel.url);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = selectedChannel.url;
      }
    }})


  return(
  <View style={styles.videoContainer}>
      <video ref={videoRef} style={styles.video} controls autoPlay />
  </View>

  );
};

export default React.memo(VideoPlayerMainScreen);
