import { useQuery } from '@tanstack/react-query';
import { fetchTodayReadings } from '../services/readingsService';

const useTodayReadings = () => {
  return useQuery({
    queryKey: ['today-readings'],
    queryFn: async () => {
      return await fetchTodayReadings();
    },
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    gcTime: 24 * 60 * 60 * 1000, // 1 day
    retry: 2,
  });
};

export default useTodayReadings;
