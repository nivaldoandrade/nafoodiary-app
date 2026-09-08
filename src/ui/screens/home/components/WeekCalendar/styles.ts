import { theme } from '@/ui/styles/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.gray[200],
    paddingBottom: 8,
  },

  row: {
    width: Platform.OS === 'web' ? '100%' : 'auto',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 10,
    gap: 4,
  },

  dayCellSelected: {
    backgroundColor: theme.colors.lime[400],
  },

  dayFuture: {
    color: theme.colors.gray[500],
  },
});
