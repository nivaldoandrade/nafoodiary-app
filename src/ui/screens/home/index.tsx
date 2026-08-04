import { AppText } from '@/ui/components/AppText';
import { Header } from '@/ui/screens/home/components/Header';
import { PlanSummaryModal } from '@/ui/screens/home/components/PlanSummaryModal';
import { styles } from '@/ui/screens/home/styles';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Home() {

  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <PlanSummaryModal />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={item => String(item)}
        ListHeaderComponent={Header}
        renderItem={({ item }) => <AppText>{item}</AppText>}
      />
    </View>
  );
}
