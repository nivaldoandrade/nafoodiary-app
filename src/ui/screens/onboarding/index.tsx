import { OnboardingStack } from '@/app/navigation/OnboardingStack';
import { OnboardingHeader } from '@/ui/screens/onboarding/components/onboardingHeader';
import { OnboardingProvider } from '@/ui/screens/onboarding/context';
import { theme } from '@/ui/styles/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export function Onboarding() {

  return (
    <OnboardingProvider>
      <KeyboardAwareScrollView
        bottomOffset={62}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: theme.colors.white,
        }}
      >
        <OnboardingHeader />
        <OnboardingStack />
      </KeyboardAwareScrollView>
    </OnboardingProvider>
  );
}
