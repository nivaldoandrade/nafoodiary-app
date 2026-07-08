import { OnboardingStack } from '@/app/navigation/OnboardingStack';
import { OnboardingHeader } from '@/ui/screens/onboarding/components/onboardingHeader';
import { OnboardingProvider } from '@/ui/screens/onboarding/context';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

export function Onboarding() {

  return (
    <OnboardingProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
        <OnboardingHeader />
        <OnboardingStack />
      </View>
    </OnboardingProvider>
  );
}
