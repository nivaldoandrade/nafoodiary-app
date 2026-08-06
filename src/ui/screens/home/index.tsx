import { Header } from '@/ui/screens/home/components/Header';
import { ItemSeparatorComponent } from '@/ui/screens/home/components/ItemSeparatorComponent';
import { MealItem } from '@/ui/screens/home/components/MealItem';
import { PlanSummaryModal } from '@/ui/screens/home/components/PlanSummaryModal';
import { styles } from '@/ui/screens/home/styles';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const DATA = Array.from({ length: 23 }, () => Math.floor(Math.random() * 1000));
const DATA = [1, 2];

export function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const { top, bottom } = useSafeAreaInsets();

  async function handleRefresh() {
    setRefreshing(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    setRefreshing(false);
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <PlanSummaryModal />
      <FlatList
        data={DATA}
        keyExtractor={item => String(item)}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={[
          styles.flatListContent,
          { paddingBottom: bottom + 12 },
        ]}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => <MealItem />}
      />
    </View>
  );
}
