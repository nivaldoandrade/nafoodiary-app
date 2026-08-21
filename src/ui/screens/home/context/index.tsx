import { Meal } from '@/app/types/Meal';
import type { CreateMealModalType } from '@/ui/components/CreateMealModals';
import { createContext } from 'react';

interface IHomeContextProps {
  meals: Meal[];
  isLoading: boolean;
  selectedDate: Date;
  onNextDate: () => void;
  onPrevDate: () => void;
  onOpenCreateMealModal: (type: Exclude<CreateMealModalType, null>) => void;
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
}: IHomeProvider) {

  return (
    <HomeContext.Provider value={{
      meals,
      isLoading,
      selectedDate,
      onNextDate,
      onPrevDate,
      onOpenCreateMealModal,
    }}>
      {children}
    </HomeContext.Provider>
  );
}
