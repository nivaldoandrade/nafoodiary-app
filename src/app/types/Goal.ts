import { ValueOf } from '@/app/utils/ValueOf';

export const Goal = {
  MAINTAIN: 'MAINTAIN',
  GAIN: 'GAIN',
  LOSE: 'LOSE',
} as const;

export type Goal = ValueOf<typeof Goal>;
