import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 24,
    gap: 8,
  },
  title: {
    textAlign: 'center',
    letterSpacing: -0.32,
  },
  subTitle: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginBottom: 34,
    justifyContent: 'flex-end',
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'flex-end',
  },
});
