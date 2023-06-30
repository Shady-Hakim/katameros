import {useQuery} from 'react-query';
import fetchCategories from '../controllers/fetchCategories';

export default useCategoriesData = id =>
  useQuery(['readings-categories', id], () => fetchCategories(id), {
    staleTime: 500000,
    select: data => data.map(cat => ({name: cat.name, id: cat.id})),
  });
