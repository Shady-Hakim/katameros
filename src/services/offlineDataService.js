import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  saveCategories,
  saveCategoryPosts,
  handleDelete,
  savePages,
} from '../helpers/offlineStorage';
import fetchCategories from '../controllers/fetchCategories';

const LAST_DOWNLOAD_KEY = 'lastAutoDownloadTimestamp';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const PAGE_IDS = [7, 2, 518];

/**
 * Check if auto-download is needed based on last download timestamp
 */
export const shouldAutoDownload = async () => {
  const lastDownloadStr = await AsyncStorage.getItem(LAST_DOWNLOAD_KEY);
  const now = Date.now();

  return !lastDownloadStr || now - parseInt(lastDownloadStr, 10) >= ONE_WEEK_MS;
};

/**
 * Check if device is connected to the internet
 */
export const checkInternetConnection = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

/**
 * Download all offline data (categories, posts, and pages)
 */
export const downloadOfflineData = async () => {
  // Check internet connection
  const isConnected = await checkInternetConnection();
  if (!isConnected) {
    console.log('No internet connection, skipping auto-download');
    return { success: false, reason: 'no_internet' };
  }

  // Check if download is needed
  const needsDownload = await shouldAutoDownload();
  if (!needsDownload) {
    console.log('Auto-download not needed yet');
    return { success: false, reason: 'not_needed' };
  }

  try {
    console.log('Starting automatic data download...');

    // Clear existing data
    await handleDelete();

    // Fetch and save categories
    const categories = await fetchCategories(0);
    if (!categories || categories.length === 0) {
      console.log('No categories found');
      return { success: false, reason: 'no_categories' };
    }

    await saveCategories(categories);

    // Download posts for each category
    for (let i = 0; i < categories.length; i++) {
      const categoryId = categories[i].id;
      await saveCategoryPosts(categoryId);
      console.log(`Downloaded category ${i + 1}/${categories.length}`);
    }

    // Download specific pages
    for (let i = 0; i < PAGE_IDS.length; i++) {
      const pageId = PAGE_IDS[i];
      await savePages(pageId);
      console.log(`Downloaded page ${i + 1}/${PAGE_IDS.length}`);
    }

    // Save the download timestamp
    const now = Date.now();
    await AsyncStorage.setItem(LAST_DOWNLOAD_KEY, now.toString());

    console.log('Automatic data download completed successfully');

    return { success: true };
  } catch (error) {
    console.error('Error in auto-download:', error);
    return { success: false, reason: 'error', error };
  }
};
