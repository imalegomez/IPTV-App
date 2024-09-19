import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import Hls from 'hls.js';

import styles from './styles';

const VideoPlayerMainScreen = React.memo(({ selectedChannel }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!selectedChannel || Platform.OS !== 'web' || !videoRef.current) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(selectedChannel.url);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = selectedChannel.url;
    }

    return () => {
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, [selectedChannel]);

  return (
    <View style={styles.videoContainer}>
      <video ref={videoRef} style={styles.video} controls autoPlay />
    </View>
  );
});

VideoPlayerMainScreen.displayName = 'VideoPlayerMainScreen';

export default VideoPlayerMainScreen;