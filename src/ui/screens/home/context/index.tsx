import { Meal } from '@/app/types/Meal';
import { createContext } from 'react';

interface IHomeContextProps {
  meals: Meal[];
}

export const HomeContext = createContext({} as IHomeContextProps);

interface IHomeProvider extends IHomeContextProps {
  children: React.ReactNode;
}
export function HomeProvider({ children, meals }: IHomeProvider) {

  return (
    <HomeContext.Provider value={{ meals: meals }}>
      {children}
    </HomeContext.Provider>
  );
}
