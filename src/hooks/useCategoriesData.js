import { useQuery } from 'react-query';
import fetchCategories from '../controllers/fetchCategories';

export default useCategoriesData = (id, page) =>
  useQuery(['readings-categories', id, page], () => fetchCategories(id, page), {
    staleTime: 1 * (60 * 60 * 1000 * 24), // 1 Day
    cacheTime: 1 * (60 * 60 * 1000 * 24), // 1 Day
    keepPreviousData: true,
    select: (data) => data.map((cat) => ({ name: cat.name, id: cat.id })),
    getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
  });
