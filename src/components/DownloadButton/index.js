import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
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
      {isDownloading ? (
        <View style={styles.downloadingContainer}>
          <ActivityIndicator
            size="small"
            color="#ffffff"
            style={styles.spinner}
          />
          <Text style={styles.buttonText}>جاري التحميل... {progress}% </Text>
        </View>
      ) : (
        <Text style={styles.buttonText}>تحميل نسخة</Text>
      )}
    </TouchableOpacity>
  );
};

export default DownloadOfflineButton;
