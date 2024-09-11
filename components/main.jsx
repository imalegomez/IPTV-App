import React, { useState } from 'react';
import VideoPlayer from './videoPlayer';
import ChannelList from './channelList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native'; // Cambiar a 'react-native' en lugar de 'react-native-web'

export function Main() {
  const [selectedChannel, setSelectedChannel] = useState(null); // Estado para el canal seleccionado
  const insets = useSafeAreaInsets();

  // Función para manejar la selección de un canal
  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel); // Establecer el canal seleccionado
  };

  // Función para salir del video y volver a la lista
  const handleExitVideo = () => {
    setSelectedChannel(null); // Restablecer el canal seleccionado
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1}}>
      {selectedChannel ? (
        <VideoPlayer selectedChannel={selectedChannel} onExitVideo={handleExitVideo} />
      ) : (
        <ChannelList onSelectChannel={handleSelectChannel} />
      )}
    </View>
  );
}
