import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

});
