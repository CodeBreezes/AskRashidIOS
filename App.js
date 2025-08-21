// App.js
import React from 'react';
import { View, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function MainLayout({ children }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: '#0D5EA6', // ✅ match StatusBar color
      }}
    >
      {children}
    </View>
  );
}

const App = () => {
  return (
    <SafeAreaProvider>
      {/* Globally configure status bar */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0D5EA6"
        translucent={false}
      />

      <MainLayout>
        <AppNavigator />
      </MainLayout>
    </SafeAreaProvider>
  );
};

export default App;
