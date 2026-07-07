import { OnboardingContext } from '@/ui/screens/onboarding/context';
import { use } from 'react';

export function useOnboarding() {
  const value = use(OnboardingContext);

  if (!value) {
    throw new Error('useOnboarding must be used inside <OnboardingProvider />');
  }

  return value;
}
