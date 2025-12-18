import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, I18nManager } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import useAutoDownload from './src/hooks/useAutoDownload';
import useNetworkStatus from './src/hooks/useNetworkStatus';
import useAppUpdates from './src/hooks/useAppUpdates';
import { toastConfig } from './src/config/toastConfig';

const queryClient = new QueryClient();

const App = () => {
  useAppUpdates();
  useNetworkStatus();
  useAutoDownload();

  useEffect(() => {
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#4c2710'} />
        <AppNavigator />
        <Toast config={toastConfig} />
      </View>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4c2710',
  },
});

export default App;
