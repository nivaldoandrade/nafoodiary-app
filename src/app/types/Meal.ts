import { Food } from '@/app/types/Food';
import { ValueOf } from '@/app/utils/ValueOf';

export type Meal = {
  id: string;
  name: string;
  icon: string;
  foods: Food[];
  createdAt: string;
}

export type MealItem = {
  id: string;
  status: MealStatus;
  inputFileType: MealInput;
  inputFileUrl: string
  name: string;
  icon: string;
  foods: Food[];
  createdAt: Date;
}

export const MealStatus = {
  UPLOADING: 'UPLOADING',
  QUEUED: 'QUEUED',
  PROCESSING: 'PROCESSING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;

export type MealStatus = ValueOf<typeof MealStatus>;

export const MealInput = {
  PICTURE: 'PICTURE',
  AUDIO: 'AUDIO',
} as const;

export type MealInput = ValueOf<typeof MealInput>;
