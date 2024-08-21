import { useQuery } from 'react-query';
import fetchPages from '../controllers/fetchPages';

export default usePagesData = (id) =>
  useQuery(['pages', id], () => fetchPages(id), {
    staleTime: 1 * (60 * 60 * 1000 * 24 * 30), // 1 Month
    cacheTime: 1 * (60 * 60 * 1000 * 24 * 30), // 1 Month
  });
