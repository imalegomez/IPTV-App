import React, { useState } from "react";
import { VideoPlayer } from "../videoPlayer";
import { ChannelList } from "../ChannelList";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, View } from "react-native";
import { MainHeader } from "../mainHeader";
import { BottomNav } from "../BottomNav";

export const Main = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const insets = useSafeAreaInsets();

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
  };

  const handleExitVideo = () => {
    setSelectedChannel(null);
  };

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}
    >
      {!selectedChannel && <MainHeader />}
      {selectedChannel ? (
        <VideoPlayer
          selectedChannel={selectedChannel}
          onExitVideo={handleExitVideo}
        />
      ) : (
        <>
          <StatusBar style="light" />
          <ChannelList onSelectChannel={handleSelectChannel} />
        </>
      )}
      {Platform.OS === "android" || Platform.OS === "ios" ? (
        <BottomNav />
      ) : null}
    </View>
  );
};
