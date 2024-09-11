import React, { useState } from 'react';
import VideoPlayer from './videoPlayer';
import ChannelList from './channelList';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import MainHeader from './mainHeader'; // Importa el encabezado principal

export function Main() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const insets = useSafeAreaInsets();

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel);
  };

  const handleExitVideo = () => {
    setSelectedChannel(null);
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      {!selectedChannel && <MainHeader />} 
      {selectedChannel ? (
        <VideoPlayer selectedChannel={selectedChannel} onExitVideo={handleExitVideo} />
      ) : (
        <>
          <StatusBar style='light'/>
          <ChannelList onSelectChannel={handleSelectChannel} />
        </>
      )}
    </View>
  );
}
