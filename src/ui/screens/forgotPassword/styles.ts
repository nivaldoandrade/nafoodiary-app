import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  sheet: {
    flex: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    marginBottom: 34,
    justifyContent: 'flex-end',
  },
  footer: {
    width: '100%',
  },
});
