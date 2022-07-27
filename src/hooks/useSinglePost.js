import {useQuery} from 'react-query';
import fetchSinglePost from '../controllers/fetchSinglePost';

export default useSinglePost = id =>
  useQuery(['readings-single-post', id], () => fetchSinglePost(id), {
    staleTime: 500000,
  });
