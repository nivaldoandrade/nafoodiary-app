import { Header } from '@/ui/screens/home/components/Header';
import { ItemSeparatorComponent } from '@/ui/screens/home/components/ItemSeparatorComponent';
import { ListFooterComponent } from '@/ui/screens/home/components/ListFooterComponent';
import { MealItem } from '@/ui/screens/home/components/MealItem';
import { PlanSummaryModal } from '@/ui/screens/home/components/PlanSummaryModal';
import { styles } from '@/ui/screens/home/styles';
import { useState } from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const DATA = Array.from({ length: 23 }, () => Math.floor(Math.random() * 1000));
const DATA = [1, 2, 3, 4, 5, 6];

export function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const { top } = useSafeAreaInsets();

  async function handleRefresh() {
    setRefreshing(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    setRefreshing(false);
  }

  return (
    <View style={[styles.container]}>
      <PlanSummaryModal />
      <FlatList
        data={DATA}
        keyExtractor={item => String(item)}
        contentInset={{ top: top }}
        contentOffset={{ x: 0, y: -top }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            progressViewOffset={top}
          />
        }
        contentContainerStyle={[styles.flatListContent, {
          paddingTop: Platform.OS === 'android' ? top : 0,
        }]}
        ListHeaderComponent={Header}
        ListFooterComponent={ListFooterComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => <MealItem />}
      />
    </View>
  );
}
