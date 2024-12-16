import { useQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchSinglePost from '../controllers/fetchSinglePost';

const useSinglePost = (id) => {
  const fetchSinglePostWithStorage = async () => {
    const storageKey = `single-post-${id}`;

    // Try to get the post from AsyncStorage first
    const storedData = await AsyncStorage.getItem(storageKey);
    if (storedData) {
      console.log(`Post ${id} retrieved from AsyncStorage.`);
      return JSON.parse(storedData);
    }

    console.log(`No stored data for post ${id}. Fetching from API...`);

    // If not in storage, fetch it from the API
    const fetchedData = await fetchSinglePost(id);

    return fetchedData[0];
  };

  return useQuery(['single-post', id], fetchSinglePostWithStorage, {
    staleTime: 1 * (60 * 60 * 1000 * 24), // 1 day
    cacheTime: 1 * (60 * 60 * 1000 * 24), // 1 day
  });
};

export default useSinglePost;
