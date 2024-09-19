import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HOUR_WIDTH = 200;
const CHANNEL_WIDTH = 100;
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
  return date.toLocaleTimeString('es-AR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    timeZone: 'America/Argentina/Buenos_Aires',
    hour12: false
  });
};

const ProgressBar = React.memo(({ start, stop, currentTime }) => {
  const progress = Math.min(Math.max((currentTime - start) / (stop - start), 0), 1);

  return (
    <View style={styles.progressBarContainer}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={[styles.progressBar, { width: `${progress * 100}%` }]}
      />
    </View>
  );
});

const ProgramItem = React.memo(({ program, startOfDay, currentTime, onPress }) => {
  const startDate = new Date(program['@start']);
  const stopDate = new Date(program['@stop']);
  const duration = (stopDate - startDate) / (60 * 60 * 1000);
  const itemWidth = duration * HOUR_WIDTH;
  const leftPosition = ((startDate - startOfDay) / (60 * 60 * 1000)) * HOUR_WIDTH;
  const isLive = currentTime >= startDate && currentTime < stopDate;
  const isPast = currentTime > stopDate;

  return (
    <TouchableOpacity
      style={[
        styles.programItem, 
        { width: itemWidth, left: leftPosition },
        isLive && styles.liveProgram,
        isPast && styles.pastProgram
      ]}
      onPress={() => onPress(program)}
    >
      <Text style={styles.programTitle} numberOfLines={2}>{program.title['#text']}</Text>
      <Text style={styles.programTime}>
        {formatDate(startDate)} - {formatDate(stopDate)}
      </Text>
      <ProgressBar start={startDate} stop={stopDate} currentTime={currentTime} />
      {isLive && <Text style={styles.liveText}>EN VIVO</Text>}
    </TouchableOpacity>
  );
});

const ChannelRow = React.memo(({ channel, programs, startOfDay, currentTime, onProgramPress }) => {
  const filteredPrograms = useMemo(() => {
    const endOfDay = new Date(startOfDay.getTime() + HOURS_TO_SHOW * 60 * 60 * 1000);
    return programs.filter(program => 
      (program['@start'] >= startOfDay && program['@start'] < endOfDay) ||
      (program['@stop'] > startOfDay && program['@stop'] <= endOfDay) ||
      (program['@start'] <= startOfDay && program['@stop'] >= endOfDay)
    );
  }, [programs, startOfDay]);

  return (
    <View style={styles.channelRow}>
      <View style={styles.channelInfo}>
        <Text style={styles.channelName} numberOfLines={2}>{channel.name}</Text>
      </View>
      <View style={{ width: HOUR_WIDTH * HOURS_TO_SHOW }}>
        {filteredPrograms.map((program, index) => (
          <ProgramItem
            key={`${channel['@id']}-${program['@start']}-${index}`}
            program={program}
            startOfDay={startOfDay}
            currentTime={currentTime}
            onPress={onProgramPress}
          />
        ))}
      </View>
    </View>
  );
});

const TimeHeader = React.memo(({ startOfDay }) => {
  const hours = useMemo(() => 
    Array.from({ length: HOURS_TO_SHOW }, (_, i) => {
      const date = new Date(startOfDay);
      date.setHours(date.getHours() + i);
      return date;
    }),
  [startOfDay]);

  return (
    <View style={styles.timeHeaderContainer}>
      <View style={{ width: CHANNEL_WIDTH }} />
      <View style={styles.timeHeader}>
        {hours.map((hour, index) => (
          <View key={index} style={[styles.hourCell, { width: HOUR_WIDTH }]}>
            <Text style={styles.hourText}>{formatDate(hour)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
});

const Guide = () => {
  const [tvData, setTvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startOfDay, setStartOfDay] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://192.168.1.39:8000/archivo.json');
      const json = await response.json();
      
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
    const intervalId = setInterval(fetchData, 300000); // Actualizamos cada 5 minutos
    return () => clearInterval(intervalId);
  }, [fetchData]);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleProgramPress = useCallback((program) => {
    console.log('Programa seleccionado:', program);
  }, []);

  const moveTimeBack = useCallback(() => {
    setStartOfDay(prev => {
      const newDate = new Date(prev);
      newDate.setHours(newDate.getHours() - 2);
      return newDate;
    });
  }, []);

  const moveTimeForward = useCallback(() => {
    setStartOfDay(prev => {
      const newDate = new Date(prev);
      newDate.setHours(newDate.getHours() + 2);
      return newDate;
    });
  }, []);

  const resetToCurrentTime = useCallback(() => {
    const now = new Date();
    const start = new Date(now);
    start.setHours(now.getHours() - 2, 0, 0, 0);
    setStartOfDay(start);
    setCurrentTime(now);
  }, []);

  const renderItem = useCallback(({ item: channel }) => (
    <ChannelRow
      channel={channel}
      programs={tvData.tv.programme.filter(p => p['@channel'] === channel['@id'])}
      startOfDay={startOfDay}
      currentTime={currentTime}
      onProgramPress={handleProgramPress}
    />
  ), [tvData, startOfDay, currentTime, handleProgramPress]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (!tvData) return <Text>Error al cargar los datos</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.navigationControls}>
        <TouchableOpacity style={styles.navButton} onPress={moveTimeBack}>
          <Text>◀ 2h</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={resetToCurrentTime}>
          <Text>Ahora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={moveTimeForward}>
          <Text>2h ▶</Text>
        </TouchableOpacity>
      </View>
      <TimeHeader startOfDay={startOfDay} />
      <FlatList
        data={tvData.tv.channel}
        renderItem={renderItem}
        keyExtractor={(item) => item['@id']}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={5}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navigationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  navButton: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  timeHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
  },
  timeHeader: {
    flexDirection: 'row',
    height: 40,
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
    padding: 5,
  },
  channelName: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  programItem: {
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    justifyContent: 'space-between',
    position: 'absolute',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  programTitle: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  programTime: {
    fontSize: 10,
    color: '#666',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 2,
  },
  progressBar: {
    height: '100%',
  },
  liveProgram: {
    backgroundColor: '#ffd700',
  },
  pastProgram: {
    opacity: 0.7,
  },
  liveText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 10,
  },
})

export default React.memo(Guide);