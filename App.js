import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  I18nManager,
} from 'react-native';
import AppNavigagtor from './src/navigation/AppNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    I18nManager.forceRTL(true);
  });
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <SafeAreaView>
          <StatusBar barStyle={'light-content'} />
        </SafeAreaView>
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
