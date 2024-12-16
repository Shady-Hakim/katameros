import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import useDownloadOffline from '../../hooks/useDownloadOffline';

const DownloadOfflineButton = () => {
  const { isDownloading, progress, handleDownload } = useDownloadOffline();

  return (
    <TouchableOpacity
      style={[styles.button, isDownloading && styles.buttonDisabled]}
      onPress={handleDownload}
      disabled={isDownloading}
    >
      <Text style={styles.buttonText}>
        {isDownloading ? `جاري التحميل... ${progress}%` : 'تحميل نسخة'}
      </Text>
    </TouchableOpacity>
  );
};

export default DownloadOfflineButton;
