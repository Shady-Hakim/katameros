import { useQuery } from 'react-query';
import fetchSinglePost from '../controllers/fetchSinglePost';

export default useSinglePost = (id) =>
  useQuery(['readings-single-post', id], () => fetchSinglePost(id), {
    staleTime: 1 * (60 * 60 * 1000 * 24 * 30), // 1 Month
    cacheTime: 1 * (60 * 60 * 1000 * 24 * 30), // 1 Month
  });
