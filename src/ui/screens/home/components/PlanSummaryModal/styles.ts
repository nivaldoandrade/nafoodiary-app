import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lime[900],
  },

  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[200],
    marginBottom: 24,
  },

  headerContent: {
    gap: 8,
  },

  title: {
    textAlign: 'center',
    letterSpacing: -0.32,
  },

  titleHighlight: {
    color: theme.colors.lime[500],
  },

  rainbow: {
    width: '100%',
    paddingHorizontal: 24,
  },

  footer: {
  },
});
