import { View } from 'react-native';

import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';

export function BirthDateStep() {

  const {
    currentStepIndex,
    nextStep,
    previousStep,
  } = useOnboarding();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="4xl">
        BirthDateStep
      </AppText>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <ButtonApp onPress={previousStep}>
          Previous
        </ButtonApp>
        <ButtonApp onPress={nextStep}>
          Next
        </ButtonApp>
        <AppText>{currentStepIndex}</AppText>
      </View>
    </View>
  );
}
