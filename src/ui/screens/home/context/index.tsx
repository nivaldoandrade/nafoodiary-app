import { Meal } from '@/app/types/Meal';
import type { CreateMealModalType } from '@/ui/components/CreateMealModals';
import { createContext, useMemo } from 'react';

interface IHomeContextProps {
  meals: Meal[];
  isLoading: boolean;
  selectedDate: Date;
  onNextDate: () => void;
  onPrevDate: () => void;
  onOpenCreateMealModal: (type: Exclude<CreateMealModalType, null>) => void;
  onSelectDate: (date: Date) => void;
}

export const HomeContext = createContext({} as IHomeContextProps);

interface IHomeProvider extends IHomeContextProps {
  children: React.ReactNode;
}
export function HomeProvider({
  children,
  meals,
  isLoading,
  selectedDate,
  onNextDate,
  onPrevDate,
  onOpenCreateMealModal,
  onSelectDate,
}: IHomeProvider) {

  const value = useMemo(() => ({
    meals,
    isLoading,
    selectedDate,
    onNextDate,
    onPrevDate,
    onOpenCreateMealModal,
    onSelectDate,
  }), [
    meals,
    isLoading,
    selectedDate,
    onNextDate,
    onPrevDate,
    onOpenCreateMealModal,
    onSelectDate,
  ]);

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  );
}
