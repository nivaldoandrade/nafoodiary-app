import { AppText } from '@/ui/components/AppText';
import { Header } from '@/ui/screens/home/components/Header';
import { PlanSummaryModal } from '@/ui/screens/home/components/PlanSummaryModal';
import { styles } from '@/ui/screens/home/styles';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    <View style={[styles.container, { paddingTop: top }]}>
      <PlanSummaryModal />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={item => String(item)}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={Header}
        renderItem={({ item }) => <AppText>{item}</AppText>}
      />
    </View>
  );
}
