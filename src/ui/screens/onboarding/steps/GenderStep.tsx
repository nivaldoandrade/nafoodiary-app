import { OnboardingStackScreenProps } from '@/app/navigation/OnboardingStack';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { View } from 'react-native';

type GenderStepProps = OnboardingStackScreenProps<'GenderStep'>;

export function GenderStep({ navigation }: GenderStepProps) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="4xl">
        GenderStep
      </AppText>
      <ButtonApp onPress={() => navigation.goBack()}>Back</ButtonApp>
    </View>
  );
}
