import { MealsService } from '@/app/services/MealsService';
import { MealStatus } from '@/app/types/Meal';
import { useQuery } from '@tanstack/react-query';

const PROCESSING_STATUSES = new Set<MealStatus>([
  MealStatus.UPLOADING,
  MealStatus.QUEUED,
  MealStatus.PROCESSING,
]);

export function useGetMealById(mealId?: string) {

  const { data: meal, isLoading } = useQuery({
    queryKey: ['meal', mealId],
    enabled: !!mealId,
    queryFn: () => {
      if (!mealId) {
        return;
      }

      return MealsService.getById(mealId);
    },
    staleTime: Infinity,
    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status && PROCESSING_STATUSES.has(status)) {
        return 3000;
      }

      return false;
    },
  });

  const isProcessing = !!(meal && PROCESSING_STATUSES.has(meal.status));

  return {
    meal,
    isLoading,
    isProcessing,
  };
}
