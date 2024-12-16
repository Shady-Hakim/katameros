import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPages from '../controllers/fetchPages';

const usePagesData = (id) => {
  const fetchPagesFromStorage = async () => {
    try {
      const storedPages = await AsyncStorage.getItem(`pages-${id}`);
      if (storedPages) {
        console.log(`Pages for pageId ${id} retrieved from AsyncStorage.`);
        return JSON.parse(storedPages);
      }
      return null;
    } catch (error) {
      console.error('Error fetching pages from AsyncStorage', error);
      return null;
    }
  };

  return useQuery(
    ['pages', id],
    async () => {
      const cachedPages = await fetchPagesFromStorage();
      if (cachedPages) {
        return cachedPages;
      }
      const pages = await fetchPages(id);
      return pages;
    },
    {
      staleTime: 1 * (60 * 60 * 1000 * 24 * 30), // 1 Month
      cacheTime: 1 * (60 * 60 * 1000 * 24 * 30), // 1 Month
    },
  );
};

export default usePagesData;
