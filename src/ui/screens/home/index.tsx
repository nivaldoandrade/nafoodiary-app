import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { useListMealByDay } from '@/app/hooks/queries/useListMealByDay';
import { Header } from '@/ui/screens/home/components/Header';
import { ItemSeparatorComponent } from '@/ui/screens/home/components/ItemSeparatorComponent';
import { ListEmpty } from '@/ui/screens/home/components/ListEmpty';
import { MealItem } from '@/ui/screens/home/components/MealItem';
import { PlanSummaryModal } from '@/ui/screens/home/components/PlanSummaryModal';
import { SplashScreenLoader } from '@/ui/screens/home/components/SplashScreenLoader';
import { HomeProvider } from '@/ui/screens/home/context';
import { styles } from '@/ui/screens/home/styles';
import { useState } from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const { isSignedUp } = useAuth();

  const { meals, isLoading } = useListMealByDay(new Date(2026, 5, 28));

  const { top, bottom } = useSafeAreaInsets();

  async function handleRefresh() {
    setRefreshing(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    setRefreshing(false);
  }

  const showSplash = isLoading && !isSignedUp;

  return (
    <View style={[styles.container]}>
      <PlanSummaryModal />

      <HomeProvider meals={meals}>
        <FlatList
          data={meals}
          keyExtractor={item => item.id}
          contentInset={{ top: top }}
          contentOffset={{ x: 0, y: -top }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              progressViewOffset={top}
            />
          }
          contentContainerStyle={[styles.flatListContainer, {
            paddingTop: Platform.OS === 'android' ? top : 0,
            paddingBottom: Platform.OS === 'web' ? 32 : bottom,
          }]}
          ListEmptyComponent={ListEmpty}
          ListHeaderComponent={Header}
          ItemSeparatorComponent={ItemSeparatorComponent}
          // ListFooterComponent={ListFooterComponent}
          renderItem={({ item: meal }) => <MealItem meal={meal} />}
        />
      </HomeProvider>

      <SplashScreenLoader visible={showSplash} />
    </View>
  );
}
