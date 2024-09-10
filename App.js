import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import VideoPlayer from './components/videoPlayer'; // Importa el componente VideoPlayer
import ChannelList from './components/channelList';  // Importa el componente ChannelList


export default function App() {
  //const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [selectedChannel, setSelectedChannel] = useState(null); // Estado para el canal seleccionado

  // Función para manejar la selección de un canal
  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel); // Establecer el canal seleccionado
  };

  // Función para salir del video y volver a la lista
  const handleExitVideo = () => {
    setSelectedChannel(null); // Restablecer el canal seleccionado
  };

  return (
    <View style={styles.container}>
      {selectedChannel ? (
        <VideoPlayer selectedChannel={selectedChannel} onExitVideo={handleExitVideo} />
      ) : (
          <ChannelList onSelectChannel={handleSelectChannel}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});