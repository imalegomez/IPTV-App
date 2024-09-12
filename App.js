import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Main } from './components/main';


export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <Main />
      </View>
    </SafeAreaProvider>
  );
}