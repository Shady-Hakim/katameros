import { useEffect } from 'react';
import * as Updates from 'expo-updates';

const useAppUpdates = () => {
  useEffect(() => {
    const checkForUpdates = async () => {
      if (__DEV__) {
        return; // Skip in development
      }

      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log(`Error fetching latest Expo update: ${error}`);
      }
    };

    checkForUpdates();
  }, []);
};

export default useAppUpdates;
