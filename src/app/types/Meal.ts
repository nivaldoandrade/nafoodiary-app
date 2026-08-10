import { Food } from '@/app/types/Food';

export type Meal = {
  id: string;
  name: string;
  icon: string;
  foods: Food[];
  createdAt: string;
}
