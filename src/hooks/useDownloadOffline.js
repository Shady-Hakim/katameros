import { useState } from 'react';
import useCategoriesData from './useCategoriesData';
import {
  saveCategories,
  saveCategoryPosts,
  handleDelete,
} from '../helpers/offlineStorage';

const useDownloadOffline = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { data: categories } = useCategoriesData(0);

  // Download and save all data
  const handleDownload = async () => {
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

      console.log('All categories and posts downloaded to AsyncStorage');
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
