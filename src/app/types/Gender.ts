import { ValueOf } from '@/app/utils/ValueOf';

export const Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const;

export type Gender = ValueOf<typeof Gender>;
