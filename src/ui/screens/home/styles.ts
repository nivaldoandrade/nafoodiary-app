import { theme } from '@/ui/styles/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[400],
  },

  flatListContainer: {
    minHeight: '100%',
    borderBottomLeftRadius: Platform.OS === 'web' ? '' : 16,
    borderBottomRightRadius: Platform.OS === 'web' ? '' : 16,
    backgroundColor: theme.colors.white,
  },
});
