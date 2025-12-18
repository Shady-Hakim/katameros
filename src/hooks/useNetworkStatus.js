import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(null);

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

  return isConnected;
};

export default useNetworkStatus;
