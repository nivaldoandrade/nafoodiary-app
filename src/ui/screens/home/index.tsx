import { Header } from '@/ui/screens/home/components/Header';
import { ItemSeparatorComponent } from '@/ui/screens/home/components/ItemSeparatorComponent';
import { ListEmpty } from '@/ui/screens/home/components/ListEmpty';
import { MealItem } from '@/ui/screens/home/components/MealItem';
import { PlanSummaryModal } from '@/ui/screens/home/components/PlanSummaryModal';
import { SplashScreenLoader } from '@/ui/screens/home/components/SplashScreenLoader';
import { HomeProvider } from '@/ui/screens/home/context';
import { styles } from '@/ui/screens/home/styles';
import { useHome } from '@/ui/screens/home/useHome';
import { theme } from '@/ui/styles/theme';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';

export function Home() {
  const {
    selectedDate,
    refreshing,
    meals,
    isLoading,
    top,
    bottom,
    handleNextDate,
    handlePrevDate,
    handleRefresh,
    showSplash,
  } = useHome();

  useEffect(() => {
    if (!(Platform.OS === 'web' && !showSplash)) {
      return;
    }
    SystemUI.setBackgroundColorAsync(theme.colors.lime[400]);

    return () => {
      SystemUI.setBackgroundColorAsync(null);
    };
  }, [showSplash]);

  return (
    <View style={[styles.container]}>
      <StatusBar style='dark' />
      <PlanSummaryModal />

      <HomeProvider
        meals={meals}
        isLoading={isLoading}
        selectedDate={selectedDate}
        onNextDate={handleNextDate}
        onPrevDate={handlePrevDate}
      >
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
            paddingBottom: Platform.OS === 'web' ? 32 : bottom,
          }]}
          ListEmptyComponent={ListEmpty}
          ListHeaderComponent={Header}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={({ item: meal }) => <MealItem meal={meal} />}
        />
      </HomeProvider>

      <SplashScreenLoader visible={showSplash} />
    </View>
  );
}
