import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { AuthStackNavigatorProps, AuthStackParamList } from '@/app/navigation/AuthStack';
import { OnboardingParamList } from '@/app/navigation/OnboardingStack';
import { orderedSteps } from '@/ui/screens/onboarding/orderedSteps';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { createContext, useCallback, useMemo, type ReactNode } from 'react';

const ONBOARDING_ROUTE_NAME = 'Onboarding' satisfies keyof AuthStackParamList;

interface IOnboardingContextProps {
  initialStep: keyof OnboardingParamList;
  currentStepIndex: number;
  totalStep: number;
  isLastStep: boolean;
  nextStep: () => void;
  previousStep: () => void;
}

interface IOnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingContext = createContext({} as IOnboardingContextProps);

export function OnboardingProvider({ children }: IOnboardingProviderProps) {
  const navigation = useNavigation<AuthStackNavigatorProps>();

  const { shouldShowOnboarding } = useAuth();

  const flowSteps = useMemo(() => {
    return shouldShowOnboarding
      ? orderedSteps.filter(step => step !== 'CreateAccountStep')
      : orderedSteps;
  }, [shouldShowOnboarding]);

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

    return flowSteps.indexOf(currentName as keyof OnboardingParamList);
  });

  const nextStep = useCallback(() => {
    const nextStep = flowSteps[currentStepIndex + 1];

    if (!nextStep) {
      return;
    }

    navigation.navigate('Onboarding', { screen: nextStep });
  }, [navigation, currentStepIndex, flowSteps]);

  const previousStep = useCallback(() => {
    const previousStepIndex = currentStepIndex - 1;

    if (previousStepIndex < 0) {
      navigation.goBack();
      return;
    }

    const previousStep = flowSteps[currentStepIndex - 1];

    navigation.navigate('Onboarding', {
      screen: previousStep, pop: true,
    });
  }, [navigation, currentStepIndex, flowSteps]);

  const isLastStep = currentStepIndex === flowSteps.length - 1;

  return (
    <OnboardingContext value={{
      currentStepIndex,
      nextStep,
      previousStep,
      initialStep: flowSteps[0],
      totalStep: flowSteps.length,
      isLastStep,
    }}>
      {children}
    </ OnboardingContext>
  );
}
