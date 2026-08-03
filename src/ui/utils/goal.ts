import { Goal } from '@/app/types/Goal';

export interface IGoalInfo {
  value: Goal;
  icon: string;
  label: string;
}

export const goalInfo: IGoalInfo[] = [
  {
    value: Goal.LOSE,
    icon: '🥦',
    label: 'Perder peso',
  },
  {
    value: Goal.MAINTAIN,
    icon: '🍎',
    label: 'Manter peso',
  },
  {
    value: Goal.GAIN,
    icon: '🍗',
    label: 'Ganhar peso',
  },
];

export const goalInfoByValue = Object.fromEntries(
  goalInfo.map((info) => [info.value, info]),
) as Record<Goal, IGoalInfo>;
