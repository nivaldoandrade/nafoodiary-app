import { AuthStackNavigatorProps } from '@/app/navigation/AuthStack';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

export function Onboarding() {
  const navigation = useNavigation<AuthStackNavigatorProps>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText size="4xl" > Onboarding Screen</AppText>
      <ButtonApp onPress={() => navigation.goBack()}>
        Go back
      </ButtonApp>
    </View>
  );
}
