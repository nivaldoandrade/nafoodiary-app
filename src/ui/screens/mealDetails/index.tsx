import { useGetMealById } from '@/app/hooks/queries/useGetMealById';
import { AppStackScreenRouteProps } from '@/app/navigation/AppStack';
import { AppText } from '@/ui/components/AppText';
import { Skeleton } from '@/ui/components/Skeleton';
import { Header } from '@/ui/screens/mealDetails/components/Header';
import { Macros } from '@/ui/screens/mealDetails/components/Macros';
import { styles } from '@/ui/screens/mealDetails/styles';
import { theme } from '@/ui/styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useMemo } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function MealDetails({ route }: AppStackScreenRouteProps<'MealDetails'>) {
  const { mealId } = route.params;
  const { meal, isLoading } = useGetMealById(mealId);

  const { bottom } = useSafeAreaInsets();

  const summary = useMemo(() => {
    if (!meal?.foods || meal.foods.length === 0) {
      return {
        calories: 0,
        macros: [
          { label: 'Carboidratos' as const, quantity: 0, percentage: 0 },
          { label: 'Proteínas' as const, quantity: 0, percentage: 0 },
          { label: 'Gorduras' as const, quantity: 0, percentage: 0 },
        ],
      };
    }

    const result = meal.foods.reduce((acc, food) => {
      acc.calories += food.calories;
      acc.carbs += food.carbohydrates;
      acc.proteins += food.proteins;
      acc.fats += food.fats;
      return acc;
    }, { calories: 0, carbs: 0, proteins: 0, fats: 0 });

    const totalCaloriesFromMacros =
      result.carbs * 4 + result.proteins * 4 + result.fats * 9;

    const round = (value: number) => parseFloat(value.toFixed(1));

    const carbsPct = totalCaloriesFromMacros === 0
      ? 0
      : round((result.carbs * 4 / totalCaloriesFromMacros) * 100);
    const proteinsPct = totalCaloriesFromMacros === 0
      ? 0
      : round((result.proteins * 4 / totalCaloriesFromMacros) * 100);
    const fatsPct = totalCaloriesFromMacros === 0
      ? 0
      : round(100 - carbsPct - proteinsPct);

    return {
      calories: Math.round(result.calories),
      macros: [
        { label: 'Carboidratos' as const, quantity: round(result.carbs), percentage: carbsPct },
        { label: 'Proteínas' as const, quantity: round(result.proteins), percentage: proteinsPct },
        { label: 'Gorduras' as const, quantity: round(result.fats), percentage: fatsPct },
      ],
    };
  }, [meal]);

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
      <Header totalCalories={summary.calories} isLoading={isLoading} />
      <Macros macros={summary.macros} isLoading={isLoading} />
      <View style={styles.divider} />
      <View style={styles.listHeader}>
        <Skeleton width="50%" height={32} show={isLoading}>
          <AppText color={theme.colors.black[700]} weight='semiBold' size='2xl'>
            {meal?.name}
          </AppText>
        </Skeleton>
        <AppText color={theme.colors.gray[700]} weight='medium' >
          Itens
        </AppText>
      </View>
      <FlatList
        data={meal?.foods ?? []}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'web' ? 34 : bottom,
        }}
        ListEmptyComponent={() => (
          !isLoading
            ? null
            : (
              <>
                <View style={styles.foodContainer}>
                  <Skeleton width='100%' height={60} colorMode='light' />
                </View>
                <View style={styles.foodContainer}>
                  <Skeleton width='100%' height={60} colorMode='light' />
                </View>
                <View style={styles.foodContainer}>
                  <Skeleton width='100%' height={60} colorMode='light' />
                </View>
              </>
            )
        )}
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
