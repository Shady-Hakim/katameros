import {useQuery} from 'react-query';
import fetchPosts from '../controllers/fetchPosts';

export default usePostsData = id =>
  useQuery(['readings-posts', id], () => fetchPosts(id), {
    staleTime: 500000,
  });
