import { theme } from '@/ui/styles/theme';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ListFooterComponent() {

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={{
      paddingBottom: Platform.OS === 'web' ? 32 : bottom,
      backgroundColor: theme.colors.white,
      borderBottomLeftRadius: Platform.OS === 'web' ? '' : 16,
      borderBottomRightRadius: Platform.OS === 'web' ? '' : 16,
    }} />
  );
}
