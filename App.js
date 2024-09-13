import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Main } from './src/components/Main/main';


export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <Main />
      </View>
    </SafeAreaProvider>
  );
}