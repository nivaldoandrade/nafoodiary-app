import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { useListMealByDay } from '@/app/hooks/queries/useListMealByDay';
import type { CreateMealModalAnimationType, CreateMealModalType } from '@/ui/components/CreateMealModals';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CREATE_MEAL_MODAL_EXIT_DURATION = 350;

export function useHome() {
  const [activeCreateMealModal, setActiveCreateMealModal] = useState<CreateMealModalType>(null);
  const [isCreateMealModalVisible, setIsCreateMealModalVisible] = useState(false);
  const [createMealModalAnimationType, setCreateMealModalAnimationType] = useState<CreateMealModalAnimationType>('slide');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const createMealModalCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { isSignedUp } = useAuth();

  const clearPendingCreateMealModalClose = useCallback(() => {
    if (createMealModalCloseTimeoutRef.current) {
      clearTimeout(createMealModalCloseTimeoutRef.current);
      createMealModalCloseTimeoutRef.current = undefined;
    }
  }, []);

  const finalizeCreateMealModalClose = useCallback(() => {
    clearPendingCreateMealModalClose();
    setActiveCreateMealModal(null);
    setCreateMealModalAnimationType('slide');
  }, [clearPendingCreateMealModalClose]);

  function handleOpenCreateMealModal(type: Exclude<CreateMealModalType, null>) {
    clearPendingCreateMealModalClose();
    setActiveCreateMealModal(type);
    setCreateMealModalAnimationType('slide');
    setIsCreateMealModalVisible(true);
  }

  const handleRequestCloseCreateMealModal = useCallback((animationType: CreateMealModalAnimationType = 'slide') => {
    setCreateMealModalAnimationType(animationType);
    setIsCreateMealModalVisible(false);
    clearPendingCreateMealModalClose();
    createMealModalCloseTimeoutRef.current = setTimeout(
      finalizeCreateMealModalClose,
      CREATE_MEAL_MODAL_EXIT_DURATION,
    );
  }, [clearPendingCreateMealModalClose, finalizeCreateMealModalClose]);

  useEffect(() => clearPendingCreateMealModalClose, [clearPendingCreateMealModalClose]);

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
    handleOpenCreateMealModal,
    handleRequestCloseCreateMealModal,
    activeCreateMealModal,
    isCreateMealModalVisible,
    createMealModalAnimationType,
    finalizeCreateMealModalClose,
  };
}
