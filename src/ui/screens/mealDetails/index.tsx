import { useGetMealById } from '@/app/hooks/queries/useGetMealById';
import { AppStackScreenRouteProps } from '@/app/navigation/AppStack';
import { AppText } from '@/ui/components/AppText';
import { Header } from '@/ui/screens/mealDetails/components/Header';
import { Macros } from '@/ui/screens/mealDetails/components/Macros';
import { styles } from '@/ui/screens/mealDetails/styles';
import { theme } from '@/ui/styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';
import { useCallback } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function MealDetails({ route }: AppStackScreenRouteProps<'MealDetails'>) {
  const { mealId } = route.params;
  const { meal } = useGetMealById(mealId);

  const { bottom } = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'web') {
        return;
      }
      SystemUI.setBackgroundColorAsync(theme.colors.black[800]);
    }, []),
  );

  return (
    <View style={[styles.container]}>
      <Header />
      <Macros />
      <View style={styles.divider} />
      <View style={styles.listHeader}>
        <AppText color={theme.colors.black[700]} weight='semiBold' size='2xl'>
          {meal?.name}
        </AppText>
        <AppText color={theme.colors.gray[700]} weight='medium' >
          Itens
        </AppText>
      </View>
      <FlatList
        data={meal?.foods}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'web' ? 34 : bottom,
        }}
        renderItem={({ item }) => (
          <View style={styles.foodContainer}>
            <AppText>{item.quantity}</AppText>
            <AppText style={{ textTransform: 'capitalize' }}>
              {item.name}
            </AppText>
          </View>
        )}
      />
    </View>
  );
}
