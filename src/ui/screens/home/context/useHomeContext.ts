import { HomeContext } from '@/ui/screens/home/context';
import { use } from 'react';

export function useHomeContext() {
  const value = use(HomeContext);

  if (!value) {
    new Error('useHomeContext must be used inside <HomeProvider />');
  }

  return value;
}
