import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { useListMealByDay } from '@/app/hooks/queries/useListMealByDay';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useHome() {

  const [selectedDate, setSelectedDate] = useState(new Date(2026, 5, 28));
  const [refreshing, setRefreshing] = useState(false);
  const { isSignedUp } = useAuth();

  const {
    meals,
    initialLoading,
    isLoading,
    refetch,
  } = useListMealByDay(selectedDate);

  const { top, bottom } = useSafeAreaInsets();

  function handleNextDate() {
    setSelectedDate(prevState => {
      const next = new Date(prevState);
      next.setDate(next.getDate() + 1);
      return next;
    });
  }

  function handlePrevDate() {
    setSelectedDate(prevState => {
      const next = new Date(prevState);
      next.setDate(next.getDate() - 1);
      return next;
    });
  }

  async function handleRefresh() {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  }

  return {
    selectedDate,
    refreshing,
    meals,
    isLoading: isLoading && !refreshing,
    top,
    bottom,
    handleNextDate,
    handlePrevDate,
    handleRefresh,
    showSplash: initialLoading && !isSignedUp,
  };
}
