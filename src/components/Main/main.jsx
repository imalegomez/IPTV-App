import React, { useState } from 'react';
import VideoPlayer from '../VideoPlayer/videoPlayer';
import ChannelList from '../ChannelList/channelList';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';
import MainHeader from '../MainHeader/mainHeader'; // Importa el encabezado principal
import BottomNav from '../BottomNav/bottomNav';
import VideoPlayerMainScreen from '../VideoPlayerMainScreen/videoPlayerMainScreen';

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
      {Platform.OS !== 'web' && !selectedChannel && <MainHeader />}
      {/* Mostrar siempre el VideoPlayerMainScreen en la versión web */}
      {Platform.OS === 'web' ? (
        <>
          <MainHeader />
          <VideoPlayerMainScreen selectedChannel={selectedChannel || { url: '', title: 'Default Video' }} />
          <ChannelList onSelectChannel={handleSelectChannel} />
        </>
      ) : (
        <>
          {/* Mostrar VideoPlayer en móviles o tablets */}
          {selectedChannel ? (
            <VideoPlayer selectedChannel={selectedChannel} onExitVideo={handleExitVideo} />
          ) : (
            
            <>
              <StatusBar style='light' />
              {/* Mostrar ChannelList cuando no hay canal seleccionado */}
              <ChannelList onSelectChannel={handleSelectChannel} />
            </>
          )}
        </>
      )}

      {/* Mostrar BottomNav solo en plataformas móviles */}
      {Platform.OS !== 'web' ? <BottomNav /> : null}
    </View>
  );
}
