import { OnboardingStackScreenProps } from '@/app/navigation/OnboardingStack';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { View } from 'react-native';

type GoalStepProps = OnboardingStackScreenProps<'GoalStep'>;

export function GoalStep({ navigation }: GoalStepProps) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="4xl">
        GoalStep
      </AppText>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <ButtonApp onPress={() => navigation.goBack()}>
          Back
        </ButtonApp>
        <ButtonApp onPress={() => navigation.navigate('GenderStep')}>
          Next
        </ButtonApp>
      </View>
    </View>
  );
}
