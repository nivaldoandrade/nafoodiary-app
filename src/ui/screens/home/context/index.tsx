import { Meal } from '@/app/types/Meal';
import { createContext } from 'react';

interface IHomeContextProps {
  meals: Meal[];
  isLoading: boolean;
  selectedDate: Date;
  onNextDate: () => void;
  onPrevDate: () => void;
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
}: IHomeProvider) {

  return (
    <HomeContext.Provider value={{
      meals,
      isLoading,
      selectedDate,
      onNextDate,
      onPrevDate,
    }}>
      {children}
    </HomeContext.Provider>
  );
}
