import { useMutation } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchCategories from '../controllers/fetchCategories';

const useCategoriesData = () => {
  const fetchCategoriesWithStorage = async ({
    parentId,
    forceRefresh = false,
  }) => {
    const storageKey = `categories-${parentId}`;

    if (!forceRefresh) {
      const storedData = await AsyncStorage.getItem(storageKey);
      if (storedData) {
        console.log(
          `Categories for parentId ${parentId} retrieved from AsyncStorage.`
        );
        return JSON.parse(storedData);
      }
    }

    const data = await fetchCategories(parentId);
    return data;
  };

  const mutation = useMutation(fetchCategoriesWithStorage, {
    onSuccess: async (data, variables) => {
      const { parentId } = variables;
      const storageKey = `categories-${parentId}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    },
  });

  return {
    fetchCategories: mutation.mutate,
    ...mutation,
  };
};

export default useCategoriesData;
