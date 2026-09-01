import { AccountsService } from '@/app/services/AccountsService';
import { useQuery } from '@tanstack/react-query';

interface IUseAccountParams {
  enabled?: boolean;
}

export function useAccount({ enabled = true }: IUseAccountParams = {}) {
  const { data, refetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => AccountsService.me(),
    enabled: enabled,
    staleTime: Infinity,
  });

  return {
    account: data ?? null,
    loadAccount: refetch,
  };
};
