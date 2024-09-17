import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from 'react-native';

const formatDate = (dateString) => {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
  date.setHours(date.getHours()); // Ajustar a UTC-3

  return date;
};

const ProgressBar = ({ start, stop }) => {
  const now = new Date();
  const startDate = formatDate(start);
  const stopDate = formatDate(stop);

  const totalDuration = stopDate - startDate;
  const elapsedTime = now - startDate;
  const progress = elapsedTime > 0 ? Math.min(elapsedTime / totalDuration, 1) : 0;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const TVTimeline = ({ data }) => {
  const getChannelName = (channelId) => {
    const channel = data.tv.channel.find((ch) => ch["@id"] === channelId);
    return channel ? channel["display-name"] : 'Desconocido';
  };

  // Filtrar programas que ya han terminado
  const now = new Date();
  const upcomingPrograms = data.tv.programme.filter(program => {
    const stopDate = formatDate(program['@stop']);
    return stopDate >= now; // Solo mostrar programas que no han terminado
  });

  return (
    <FlatList
      data={upcomingPrograms}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.programContainer}>
          <Text style={styles.channelName}>{getChannelName(item['@channel'])}</Text>
          <Text>
            {formatDate(item['@start']).toLocaleString('es-AR', { hour: 'numeric', minute: 'numeric', hour12: true })} - 
            {formatDate(item['@stop']).toLocaleString('es-AR', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </Text>
          <Text style={styles.programTitle}>{item.title['#text']}</Text>
          <Text>{item.category['#text']}</Text>
          <Image source={{ uri: item.image }} style={styles.programImage} />
          <ProgressBar start={item['@start']} stop={item['@stop']} />
        </View>
      )}
    />
  );
};

const Guide = () => {
  const [tvData, setTvData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('../../archivo.json');
      const json = await response.json();
      setTvData(json);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Cargar datos iniciales

    const intervalId = setInterval(fetchData, 30000); // Actualizar cada 30 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TVTimeline data={tvData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  programContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  channelName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  programTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  programImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
});

export default Guide;
