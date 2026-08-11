import { theme } from '@/ui/styles/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    minHeight: Platform.OS === 'web' ? 'auto' : '100%',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 20,
    gap: 16,
  },
});
