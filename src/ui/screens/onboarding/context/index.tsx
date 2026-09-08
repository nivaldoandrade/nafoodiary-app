import { AuthStackNavigatorProps, AuthStackParamList } from '@/app/navigation/AuthStack';
import { OnboardingParamList } from '@/app/navigation/OnboardingStack';
import { orderedSteps } from '@/ui/screens/onboarding/orderedSteps';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { createContext, useCallback, type ReactNode } from 'react';

const ONBOARDING_ROUTE_NAME = 'Onboarding' satisfies keyof AuthStackParamList;

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
  const navigation = useNavigation<AuthStackNavigatorProps>();

  const currentStepIndex = useNavigationState(state => {
    const onboardingRoute = state.routes[state.index];

    if (
      onboardingRoute?.name !== ONBOARDING_ROUTE_NAME
      || !onboardingRoute.state
    ) {
      return 0;
    }

    const nestedState = onboardingRoute.state;
    const currentName = nestedState.routes[nestedState.index ?? 0]?.name;

    if (!currentName) {
      return 0;
    }

    return orderedSteps.indexOf(currentName as keyof OnboardingParamList);
  });

  const nextStep = useCallback(() => {
    const nextStep = orderedSteps[currentStepIndex + 1];

    if (!nextStep) {
      return;
    }

    navigation.navigate('Onboarding', { screen: nextStep });
  }, [navigation, currentStepIndex]);

  const previousStep = useCallback(() => {
    const previousStepIndex = currentStepIndex - 1;

    if (previousStepIndex < 0) {
      navigation.goBack();
      return;
    }

    const previousStep = orderedSteps[currentStepIndex - 1];

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
