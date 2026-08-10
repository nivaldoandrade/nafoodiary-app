import { MealsService } from '@/app/services/MealsService';
import { useQuery } from '@tanstack/react-query';

export function useListMealByDay(date: Date) {
  const isoDate = date.toISOString().split('T')[0];

  const { data, isLoading } = useQuery({
    queryKey: ['meals', isoDate],
    queryFn: () => MealsService.listByDay(isoDate),
    staleTime: Infinity,
  });

  return {
    meals: data?.meals ?? [],
    isLoading,
  };
}
