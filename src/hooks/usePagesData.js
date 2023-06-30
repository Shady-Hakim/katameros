import {useQuery} from 'react-query';
import fetchPages from '../controllers/fetchPages';

export default usePagesData = id =>
  useQuery(['pages', id], () => fetchPages(id), {
    staleTime: 500000,
  });
