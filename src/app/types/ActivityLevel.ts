import { ValueOf } from '@/app/utils/ValueOf';

export const ActivityLevel = {
  SENDENTARY: 'SENDENTARY',
  LIGHT: 'LIGHT',
  MODERATE: 'MODERATE',
  HEAVY: 'HEAVY',
  ATHELETE: 'ATHELETE',
} as const;

export type ActivityLevel = ValueOf<typeof ActivityLevel>;
