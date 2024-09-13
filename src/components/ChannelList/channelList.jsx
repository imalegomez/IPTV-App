import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'expo-router';
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, ScrollView, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './styles';

const ChannelList = ({ onSelectChannel }) => {
  const [isHoveredChannel, setIsHoveredChannel] = useState(false);
  const [channels, setChannels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRefs = useRef({}); // Almacena los refs para cada categoría


  useEffect(() => {
    const fetchM3U = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://iptv-org.github.io/iptv/countries/ar.m3u');
        if (!response.ok) {
          throw new Error('Error al cargar la lista de canales');
        }
        const m3uText = await response.text();
        const parsedChannels = parseM3U(m3uText);
        setChannels(parsedChannels);
      } catch (error) {
        console.error('Error fetching M3U file:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchM3U();
  }, []);

  const parseM3U = (m3uText) => {
    const lines = m3uText.split('\n');
    const channelList = {};
    let currentChannel = {};
    let currentCategory = 'Otros';

    lines.forEach((line) => {
      if (line.startsWith('#EXTINF')) {
        const match = line.match(/tvg-logo="([^"]*)".*?,(.+)/);
        const categoryMatch = line.match(/group-title="([^"]*)"/);
        if (match) {
          const [_, logoUrl, title] = match;
          const cleanedTitle = title.replace(/\s*\(.*?\)\s*|\s*\[.*?\]\s*/g, '').trim();
          currentChannel = { title: cleanedTitle, logo: logoUrl };

          if (categoryMatch && categoryMatch[1]) {
            currentCategory = categoryMatch[1].split(';')[0].replace(/Undefined/, 'Otros').trim();
          }
        }
      } else if (line.startsWith('http')) {
        currentChannel.url = line;

        if (!channelList[currentCategory]) {
          channelList[currentCategory] = [];
        }
        channelList[currentCategory].push(currentChannel);
        currentChannel = {};
      }
    });

    return channelList;
  };

  const renderChannel = (channel) => (
    <>
    {Platform.OS === 'web'?(
      <Pressable 
        onPress={() => onSelectChannel(channel)} 
        style={styles.itemContainer}
        >
        {channel.logo && (
          <Image source={{ uri: channel.logo }} style={Platform.OS === 'web' ? styles.logoWeb : styles.logo} resizeMode='contain' />
        )}
        <Text style={styles.channel}>{channel.title}</Text>
      </Pressable>
    ):(<Link href={{pathname: '/channel', params: {url: channel.url, title: channel.title}}} asChild>
    <Pressable 
      onPress={() => onSelectChannel(channel)} 
      style={styles.itemContainer}
    >
      {channel.logo && (
        <Image source={{ uri: channel.logo }} style={Platform.OS === 'web' ? styles.logoWeb : styles.logo} resizeMode='contain' />
      )}
      <Text style={styles.channel}>{channel.title}</Text>
    </Pressable>
    </Link>)}
    </>
  );

  const handleScrollLeft = (category) => {
    if (Platform.OS === 'web') {
      if (scrollRefs.current[category]) {
        scrollRefs.current[category].scrollTo({
          x: Math.max(scrollRefs.current[category].scrollLeft - 200, 0),
          animated: true,
        });
      }
    }
  };

  const handleScrollRight = (category) => {
    if (Platform.OS === 'web') {
      if (scrollRefs.current[category]) {
        scrollRefs.current[category].scrollTo({
          x: scrollRefs.current[category].scrollLeft + 200,
          animated: true,
        });
      }
    }
  };

  
  const renderCategory = ({ item: category }) => {
    const categoryChannels = channels[category] || [];

    return (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
  
          <View style={styles.horizontalContainer}>
            {Platform.OS === 'web' && (
              <Pressable onPress={() => handleScrollLeft(category)} style={styles.scrollButton}>
                <AntDesign name="leftcircleo" size={24} color="black" />
              </Pressable>
            )}
  
            <ScrollView
              horizontal
              ref={(ref) => (scrollRefs.current[category] = ref)} // Asigna el ref específico a la categoría
              contentContainerStyle={styles.scrollViewContent}
              showsHorizontalScrollIndicator={false}
            >
              {categoryChannels.map((channel, index) => (
                <View key={index} style={Platform.OS === 'web' ? styles.channelWrapperWeb : styles.channelWrapper}>
                  {renderChannel(channel)}
                </View>
              ))}
            </ScrollView>
  
            {Platform.OS === 'web' && (
              <Pressable onPress={() => handleScrollRight(category)} style={styles.scrollButton}>
                <AntDesign name="rightcircleo" size={24} color="black" />
              </Pressable>
            )}
          </View>
        </View>
      );
    };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
            <FlatList
              data={Object.keys(channels)}
              keyExtractor={(item) => item}
              renderItem={renderCategory}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />          
        </>
      )}
    </View>
  );
};



export default React.memo(ChannelList);
