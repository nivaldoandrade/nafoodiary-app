import { AppStackScreenRouteProps } from '@/app/navigation/AppStack';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { View } from 'react-native';

export function MealDetails({ route, navigation }: AppStackScreenRouteProps<'MealDetails'>) {
  const { mealId } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 }}>
      <AppText style={{ textAlign: 'center' }}>
        Meal Details Screen: {mealId}
      </AppText>
      <ButtonApp onPress={navigation.goBack}>
        Voltar
      </ButtonApp>
    </View>
  );
}
