import { useInfiniteQuery } from 'react-query';
import fetchPosts from '../controllers/fetchPosts';

const usePostsData = (id) => {
  return useInfiniteQuery(
    ['readings-posts', id],
    ({ pageParam = 1 }) => fetchPosts(id, pageParam), // Default to page 1
    {
      staleTime: 1 * (60 * 60 * 1000 * 24), // 1 Day
      cacheTime: 1 * (60 * 60 * 1000 * 24), // 1 Day
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.hasNextPage ? allPages.length + 1 : false;
      },
    },
  );
};

export default usePostsData;
