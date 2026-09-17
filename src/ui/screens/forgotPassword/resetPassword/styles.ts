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
  successContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 24,
    gap: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  footer: {
    width: '100%',
    gap: 16,
  },
});
