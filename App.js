import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, I18nManager } from 'react-native';
import * as Updates from 'expo-updates';
import { QueryClient, QueryClientProvider } from 'react-query';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';

const queryClient = new QueryClient();

const App = () => {
  const [isConnected, setIsConnected] = useState(null);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  useEffect(() => {
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== isConnected) {
        setIsConnected(state.isConnected);
        Toast.show({
          type: state.isConnected ? 'success' : 'error',
          text1: state.isConnected ? 'متصل' : 'غير متصل',
          text2: state.isConnected
            ? 'أنت الآن متصل بالإنترنت!'
            : 'لا يوجد اتصال بالإنترنت!',
          position: 'bottom',
        });
      }
    });

    return () => unsubscribe();
  }, [isConnected]);

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

const toastConfig = {
  success: (props) => (
    <View style={[styles.toastContainer, styles.successToast]}>
      <Text style={styles.toastText}>{props.text1}</Text>
      {props.text2 ? (
        <Text style={styles.toastSubText}>{props.text2}</Text>
      ) : null}
    </View>
  ),
  error: (props) => (
    <View style={[styles.toastContainer, styles.errorToast]}>
      <Text style={styles.toastText}>{props.text1}</Text>
      {props.text2 ? (
        <Text style={styles.toastSubText}>{props.text2}</Text>
      ) : null}
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4c2710',
  },
  toastContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 15,
    position: 'absolute',
    bottom: 30,
    alignItems: 'flex-start',
  },
  successToast: {
    backgroundColor: '#4caf50',
  },
  errorToast: {
    backgroundColor: '#f44336',
  },
  toastText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastSubText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default App;
