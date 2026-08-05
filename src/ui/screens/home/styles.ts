import { theme } from '@/ui/styles/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[400],
  },

  flatListContent: {
    backgroundColor: theme.colors.white,
    minHeight: '100%',
    borderBottomRightRadius: Platform.OS === 'web' ? '' : 16,
    borderBottomLeftRadius: Platform.OS === 'web' ? '' : 16,
  },
});
