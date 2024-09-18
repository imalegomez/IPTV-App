import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HOUR_WIDTH = 500;
const CHANNEL_WIDTH = 80;
const HOURS_TO_SHOW = 24;

const parseDate = (dateString) => {
  // Intenta diferentes formatos de fecha
  const formats = [
    /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s([+-]\d{4})$/,  // YYYYMMDDhhmmss +HHMM
    /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,               // YYYYMMDDhhmmss
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/           // YYYY-MM-DDTHH:mm:ss
  ];

  for (let format of formats) {
    const match = dateString.match(format);
    if (match) {
      // Si encuentra una coincidencia, crea un objeto Date
      const [, year, month, day, hour, minute, second] = match;
      return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    }
  }

  console.error('Formato de fecha no reconocido:', dateString);
  return new Date(NaN); // Retorna una fecha inválida si no se puede parsear
};

const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    return 'Fecha inválida';
  }
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
};

const ProgressBar = ({ start, stop }) => {
  const now = new Date();
  const startDate = new Date(start);
  const stopDate = new Date(stop);
  const totalDuration = stopDate - startDate;
  const elapsedTime = now - startDate;
  const progress = elapsedTime > 0 ? Math.min(elapsedTime / totalDuration, 1) : 0;

  return (
    <View style={styles.progressBarContainer}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={[styles.progressBar, { width: `${progress * 100}%` }]}
      />
    </View>
  );
};

const ProgramItem = ({ program, startOfDay, onPress }) => {
  const startDate = new Date(program['@start']);
  const stopDate = new Date(program['@stop']);
  const duration = (stopDate - startDate) / (60 * 60 * 1000);
  const itemWidth = duration * HOUR_WIDTH;
  const leftPosition = ((startDate - startOfDay) / (60 * 60 * 1000)) * HOUR_WIDTH;

  return (
    <TouchableOpacity
      style={[styles.programItem, { width: itemWidth, left: leftPosition }]}
      onPress={() => onPress(program)}
    >
      <Text style={styles.programTitle} numberOfLines={2}>{program.title['#text']}</Text>
      <Text style={styles.programTime}>
        {formatDate(startDate)} - {formatDate(stopDate)}
      </Text>
      <ProgressBar start={startDate} stop={stopDate} />
    </TouchableOpacity>
  );
};

const ChannelRow = ({ channel, programs, startOfDay, onProgramPress }) => {
  return (
    <View style={styles.channelRow}>
      <View style={styles.channelInfo}>
        <Text style={styles.channelName}>{channel.name}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ width: HOUR_WIDTH * HOURS_TO_SHOW }}>
          {programs.map((program, index) => (
            <ProgramItem
              key={`${channel.id}-${program.title}-${index}`}
              program={program}
              startOfDay={startOfDay}
              onPress={onProgramPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const TimeHeader = ({ startOfDay }) => {
  const hours = Array.from({ length: HOURS_TO_SHOW }, (_, i) => {
    const date = new Date(startOfDay);
    date.setHours(date.getHours() + i);
    return date;
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.timeHeader}>
        {hours.map((hour, index) => (
          <View key={index} style={[styles.hourCell, { width: HOUR_WIDTH }]}>
            <Text style={styles.hourText}>{formatDate(hour)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


const Guide = () => {
  const [tvData, setTvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startOfDay, setStartOfDay] = useState(new Date());

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('../../archivo.json');
      const json = await response.json();
      
      // Parsea las fechas en los datos
      json.tv.programme = json.tv.programme.map(program => ({
        ...program,
        '@start': parseDate(program['@start']),
        '@stop': parseDate(program['@stop'])
      }));

      setTvData(json);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now);
    start.setHours(now.getHours() - 12, 0, 0, 0);
    setStartOfDay(start);
  }, []);

  const handleProgramPress = useCallback((program) => {
    console.log('Programa seleccionado:', program);
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!tvData) return <Text>Error al cargar los datos</Text>;

  return (
    <View style={styles.container}>
      <TimeHeader startOfDay={startOfDay} />
      <FlatList
        data={tvData.tv.channel.slice(0,3)}
        renderItem={({ item: channel }) => (
          <ChannelRow
            channel={channel}
            programs={tvData.tv.programme.filter(p => p['@channel'] === channel['@id'])}
            startOfDay={startOfDay}
            onProgramPress={handleProgramPress}
          />
        )}
        keyExtractor={(item) => item['@id']}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  timeHeader: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#e0e0e0',
    paddingLeft: CHANNEL_WIDTH,
  },
  hourCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  channelRow: {
    flexDirection: 'row',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  channelInfo: {
    width: CHANNEL_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  channelName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  programItem: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'space-between',
    position: 'absolute',
    height: '100%',
  },
  programTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  programTime: {
    fontSize: 12,
    color: '#666',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
  },
});

export default React.memo(Guide);