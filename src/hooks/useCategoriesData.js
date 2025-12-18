import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchCategories from '../controllers/fetchCategories';

const useCategoriesData = (parentId) => {
  const fetchCategoriesWithStorage = async () => {
    const storageKey = `categories-${parentId}`;

    const storedData = await AsyncStorage.getItem(storageKey);
    if (storedData) {
      console.log(
        `Categories for parentId ${parentId} retrieved from AsyncStorage.`
      );
      return JSON.parse(storedData);
    }

    const data = await fetchCategories(parentId);

    return data;
  };

  return useQuery({
    queryKey: ['readings-categories', parentId],
    queryFn: fetchCategoriesWithStorage,
    staleTime: 24 * 60 * 60 * 1000, // 1 Day
    gcTime: 24 * 60 * 60 * 1000, // 1 Day
    select: (data) => data.map((cat) => ({ name: cat.name, id: cat.id })),
  });
};

export default useCategoriesData;
