import { OnboardingParamList } from '@/app/navigation/OnboardingStack';

export type OrderedSteps = (keyof OnboardingParamList)[];

export const orderedSteps: OrderedSteps = [
  'GoalStep',
  'GenderStep',
  'BirthDateStep',
  'HeightStep',
  'WeightStep',
  'ActivityLevelStep',
  'CreateAccountStep',
];

