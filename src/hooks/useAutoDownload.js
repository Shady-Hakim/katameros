import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { downloadOfflineData } from '../services/offlineDataService';

const useAutoDownload = () => {
  useEffect(() => {
    const performAutoDownload = async () => {
      const result = await downloadOfflineData();

      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'تم التحميل',
          text2: 'تم تحميل البيانات بنجاح للاستخدام دون اتصال',
          position: 'bottom',
        });
      }
    };

    performAutoDownload();
  }, []);
};

export default useAutoDownload;
