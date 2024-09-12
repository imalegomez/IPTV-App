import React, { useState, useEffect, useRef, FC } from "react";
import { Pressable, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Video, VideoFullscreenUpdate } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import Hls from "hls.js";
import { ChannelHeader } from "../ChannelHeader";
import styles from "./styles";
import { Channel } from "../../types/Channel";
import { isWeb } from "../../constans/Helpers";

interface VideoPlayerProps {
  selectedChannel: Channel;
  onExitVideo: () => void;
}

export const VideoPlayer: FC<VideoPlayerProps> = React.memo(
  ({ selectedChannel, onExitVideo }) => {
    const videoRef = useRef(null);
    const [showHeader, setShowHeader] = useState(false);
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const hideHeaderTimeout = useRef(null);

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
      if (isWeb) {
        window.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        if (isWeb) {
          window.removeEventListener("mousemove", handleMouseMove);
          clearTimeout(hideHeaderTimeout.current);
        }
      };
    }, []);

    useEffect(() => {
      if (selectedChannel && isWeb && videoRef.current) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(selectedChannel.url);
          hls.attachMedia(videoRef.current);
        } else if (
          videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          videoRef.current.src = selectedChannel.url;
        }
      }

      const lockOrientation = async () => {
        if (isWeb) {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
          );
        }
      };
      lockOrientation();

      return () => {
        const unlockOrientation = async () => {
          if (isWeb) {
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
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
            title={
              typeof selectedChannel?.title === "string"
                ? selectedChannel.title
                : "Sin título"
            }
          />
        )}
        <View style={styles.videoContainer}>
          {isWeb ? (
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
                shouldPlay
                style={styles.video}
                onFullscreenUpdate={({ fullscreenUpdate }) => {
                  if (fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS) { // Corregido aquí
                    onExitVideo();
                  }
                }}
              />
            </>
          )}
        </View>
      </Pressable>
    );
  }
);