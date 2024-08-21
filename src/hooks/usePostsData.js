import { useQuery } from 'react-query';
import fetchPosts from '../controllers/fetchPosts';

export default usePostsData = (id, page) =>
  useQuery(['readings-posts', id, page], () => fetchPosts(id, page), {
    staleTime: 1 * (60 * 60 * 1000 * 24), // 1 Day
    cacheTime: 1 * (60 * 60 * 1000 * 24), // 1 Day
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
  });
