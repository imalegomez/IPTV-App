import React, { useState, useEffect, useCallback } from 'react';
import VideoPlayer from '../VideoPlayer/videoPlayer';
import ChannelList from '../ChannelList/channelList';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View, ActivityIndicator, Text } from 'react-native';
import MainHeader from '../MainHeader/mainHeader';
import BottomNav from '../BottomNav/bottomNav';
import VideoPlayerMainScreen from '../VideoPlayerMainScreen/videoPlayerMainScreen';
import { fetchChannels } from '../ChannelList/fetchChannels';

export function Main() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState({});
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  const loadChannels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const channelData = await fetchChannels();
      setChannels(channelData);
    } catch (err) {
      console.error('Error fetching channels:', err);
      setError('Failed to load channels.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChannels();
  }, [loadChannels]);

  const handleSelectChannel = useCallback((channel) => {
    setSelectedChannel(channel);
  }, []);

  const handleExitVideo = useCallback(() => {
    setSelectedChannel(null);
  }, []);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#fff" style={{ flex: 1 }} />;
    }

    if (error) {
      return <Text style={{ color: 'white' }}>{error}</Text>;
    }

    if (Platform.OS === 'web') {
      return (
        <>
          <MainHeader />
          <VideoPlayerMainScreen selectedChannel={selectedChannel || { url: '', title: 'Default Video' }} />
          <ChannelList channels={channels} onSelectChannel={handleSelectChannel} />
        </>
      );
    }

    return selectedChannel ? (
      <VideoPlayer selectedChannel={selectedChannel} onExitVideo={handleExitVideo} />
    ) : (
      <>
        <StatusBar style='light' />
        <ChannelList channels={channels} onSelectChannel={handleSelectChannel} />
      </>
    );
  };

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      {renderContent()}
      {Platform.OS !== 'web' && !selectedChannel && <BottomNav />}
    </View>
  );
}
