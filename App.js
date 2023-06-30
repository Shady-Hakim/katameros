import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  I18nManager,
} from 'react-native';
import AppNavigagtor from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    I18nManager.forceRTL(true);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#4c2710'} />
        <AppNavigagtor />
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
