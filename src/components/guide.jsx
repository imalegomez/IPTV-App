import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Picker, FlatList, ScrollView, Dimensions } from 'react-native';

const formatDate = (dateString) => {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(8, 10);
  const minute = dateString.substring(10, 12);
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
  return date;
};

const ProgressBar = ({ start, stop }) => {
  const now = new Date();
  const startDate = formatDate(start);
  const stopDate = formatDate(stop);
  const totalDuration = stopDate - startDate;
  const elapsedTime = now - startDate;
  const progress = elapsedTime > 0 ? Math.min(elapsedTime / totalDuration, 1) : 0;
  const barWidth = `${(progress * 100)}%`;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: barWidth }]} />
    </View>
  );
};

const TimeSlotSlider = ({ programs }) => {
  return (
    <ScrollView horizontal>
      {programs.map((program) => (
        <View key={program['@id']} style={styles.timeSlot}>
          <Text style={styles.programTitle}>{program.title['#text']}</Text>
          <Text>
            {formatDate(program['@start']).toLocaleString('es-AR', { hour: 'numeric', minute: 'numeric', hour12: true })} - 
            {formatDate(program['@stop']).toLocaleString('es-AR', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </Text>
          <ProgressBar start={program['@start']} stop={program['@stop']} />
        </View>
      ))}
    </ScrollView>
  );
};

const TimeSlotsRow = ({ totalWidth }) => {
  const hours = Array.from({ length: 24 }, (_, i) => (
    <View key={i} style={{ width: totalWidth / 24 }}>
      <Text style={styles.hour}>{`${i.toString().padStart(2, '0')}:00`}</Text>
    </View>
  ));

  return (
    <View style={styles.hourRow}>
      {hours}
    </View>
  );
};

const ChannelAndProgramsGrid = ({ data, selectedChannel }) => {
  const now = new Date();
  const filteredPrograms = data.tv.programme.filter(program => {
    const stopDate = formatDate(program['@stop']);
    return stopDate >= now && (selectedChannel ? program['@channel'] === selectedChannel : true);
  });

  const programsByChannel = filteredPrograms.reduce((acc, program) => {
    const channelId = program['@channel'];
    if (!acc[channelId]) {
      acc[channelId] = [];
    }
    acc[channelId].push(program);
    return acc;
  }, {});

  const channels = Object.keys(programsByChannel);

  return (
    <FlatList
      style={styles.gridContainer}
      data={channels}
      keyExtractor={(item) => item}
      renderItem={({ item: channelId }) => (  
        <View style={styles.channelContainer}>
          <Text style={styles.channelName}>{data.tv.channel.find(ch => ch["@id"] === channelId)["display-name"]}</Text>
          <TimeSlotSlider programs={programsByChannel[channelId]} />
        </View>
      )}
    />
  );
};

const Guide = () => {
  const [tvData, setTvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const totalWidth = Dimensions.get('window').width - 40; // Ajusta según el padding

  const fetchData = async () => {
    try {
      const response = await fetch('../../archivo.json');
      const json = await response.json();
      setTvData(json);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!tvData) return <Text>Error al cargar los datos</Text>;

  const channels = tvData.tv.channel.map((channel) => (
    <Picker.Item key={channel["@id"]} label={channel["display-name"]} value={channel["@id"]} />
  ));

  return (
    <ScrollView style={styles.container}>
      <Picker
        selectedValue={selectedChannel}
        onValueChange={(itemValue) => setSelectedChannel(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todos los canales" value={null} />
        {channels}
      </Picker>
      <TimeSlotsRow totalWidth={totalWidth} />
      <ChannelAndProgramsGrid data={tvData} selectedChannel={selectedChannel} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  picker: {
    height: 30,
    width: '100%',
    marginBottom: 20,
  },

  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 5,
  },

  hour: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  gridContainer: {
    flex: 1,
    padding: 10,
  },

  channelContainer: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flexDirection:'row' 
  },

  channelName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginRight: 40,
  },

  timeSlot: {
    padding: 10,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  programTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 5,
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
});

export default Guide;
