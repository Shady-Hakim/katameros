import { useState } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import useCategoriesData from './useCategoriesData';
import {
  saveCategories,
  saveCategoryPosts,
  handleDelete,
  savePages,
} from '../helpers/offlineStorage';

const useDownloadOffline = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { data: categories } = useCategoriesData();

  // Check network status
  const checkNetwork = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  // Download and save all data
  const handleDownload = async () => {
    // Check network status before proceeding
    const isConnected = await checkNetwork();
    if (!isConnected) {
      Alert.alert(
        'خطأ في الاتصال',
        'لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال بالشبكة.',
      );
      return;
    }

    await handleDelete(); // Clear existing data

    if (!categories) return;

    try {
      setIsDownloading(true);
      setProgress(0);

      await saveCategories(categories);

      const totalCategories = categories.length;

      for (let i = 0; i < totalCategories; i++) {
        const categoryId = categories[i].id;
        await saveCategoryPosts(categoryId);
        setProgress(Math.round(((i + 1) / totalCategories) * 100));
      }
      const pagesIds = [7, 2, 518];
      const totalPages = pagesIds.length;
      for (let i = 0; i < totalPages; i++) {
        const pageId = pagesIds[i];
        await savePages(pageId);
        setProgress(Math.round(((i + 1) / totalPages) * 100));
      }

      console.log('All categories, pages and posts downloaded to AsyncStorage');
    } catch (error) {
      console.error('Error downloading data to AsyncStorage', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    isDownloading,
    progress,
    handleDownload,
  };
};

export default useDownloadOffline;
