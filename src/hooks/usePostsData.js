import { useInfiniteQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchPosts from '../controllers/fetchPosts';

const usePostsData = (categoryId) => {
  const fetchPostsWithStorage = async ({ pageParam = 1 }) => {
    const storageKey = `posts-${categoryId}-${pageParam}`;

    const storedData = await AsyncStorage.getItem(storageKey);
    if (storedData) {
      console.log(
        `Posts for category ${categoryId} page ${pageParam} retrieved from AsyncStorage.`
      );
      return JSON.parse(storedData);
    }

    const fetchedData = await fetchPosts(categoryId, pageParam);

    return fetchedData;
  };

  return useInfiniteQuery({
    queryKey: ['readings-posts', categoryId],
    queryFn: fetchPostsWithStorage,
    staleTime: 24 * 60 * 60 * 1000, // 1 Day
    gcTime: 24 * 60 * 60 * 1000, // 1 Day
    enabled: !!categoryId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasNextPage ? allPages.length + 1 : undefined;
    },
  });
};

export default usePostsData;
