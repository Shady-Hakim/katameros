import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View, I18nManager } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#4c2710'} />
        <AppNavigator />
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
