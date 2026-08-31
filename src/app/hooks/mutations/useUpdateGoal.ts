import { queryClient } from '@/app/libs/queryClient';
import { GoalService } from '@/app/services/GoalService';
import { useMutation } from '@tanstack/react-query';

export function useUpdateGoal() {

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (params: GoalService.UpdateParams) => {
      await GoalService.update(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  return {
    updateGoal: mutateAsync,
    isPending,
  };
}
