import { OnboardingStack } from '@/app/navigation/OnboardingStack';
import { AppText } from '@/ui/components/AppText';
import { View } from 'react-native';

export function Onboarding() {

  return (
    <View style={{ flex: 1 }}>

      <AppText size="4xl" style={{
        textAlign: 'center',
        marginTop: 50,
      }}>
        Onboarding Screen
      </AppText>

      <OnboardingStack />
    </View>
  );
}
