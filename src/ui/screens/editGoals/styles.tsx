import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },

  content: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
    gap: 32,
  },

  inputGroup: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },

  unit: {
    minWidth: 56,
    minHeight: 52,
    padding: 14,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 10,
    textAlign: 'center',
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: theme.colors.gray[400],
    flexDirection: 'row',
    gap: 16,
  },
});
