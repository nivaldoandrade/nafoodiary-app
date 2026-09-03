import { queryClient } from '@/app/libs/queryClient';
import { AccountsService } from '@/app/services/AccountsService';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProfile() {

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (params: AccountsService.UpdateProfileParams) => {
      await AccountsService.updateProfile(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });

  return {
    updateProfile: mutateAsync,
    isPending,
  };
}
