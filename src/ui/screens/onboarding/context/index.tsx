import { AuthStackNavigatorProps } from '@/app/navigation/AuthStack';
import { OnboardingParamList } from '@/app/navigation/OnboardingStack';
import { orderedSteps } from '@/ui/screens/onboarding/orderedSteps';
import { useNavigation } from '@react-navigation/native';
import { createContext, useCallback, useState, type ReactNode } from 'react';

interface IOnboardingContextProps {
  initialStep: keyof OnboardingParamList;
  currentStepIndex: number;
  totalStep: number;
  nextStep: () => void;
  previousStep: () => void;
}

interface IOnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingContext = createContext({} as IOnboardingContextProps);

export function OnboardingProvider({ children }: IOnboardingProviderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigation = useNavigation<AuthStackNavigatorProps>();

  const nextStep = useCallback(() => {
    const nextStepIndex = currentStepIndex + 1;
    const nextStep = orderedSteps[currentStepIndex + 1];

    if (!nextStep) {
      return;
    }

    setCurrentStepIndex(nextStepIndex);
    navigation.navigate('Onboarding', { screen: nextStep });
  }, [navigation, currentStepIndex]);

  const previousStep = useCallback(() => {
    const previousStepIndex = currentStepIndex - 1;

    if (previousStepIndex < 0) {
      navigation.goBack();
      return;
    }

    const previousStep = orderedSteps[currentStepIndex - 1];

    setCurrentStepIndex(previousStepIndex);
    navigation.navigate('Onboarding', {
      screen: previousStep, pop: true,
    });
  }, [navigation, currentStepIndex]);

  return (
    <OnboardingContext value={{
      currentStepIndex,
      nextStep,
      previousStep,
      initialStep: orderedSteps[0],
      totalStep: orderedSteps.length,
    }}>
      {children}
    </ OnboardingContext>
  );
}
