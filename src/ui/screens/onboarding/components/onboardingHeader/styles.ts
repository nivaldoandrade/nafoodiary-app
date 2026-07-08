import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.gray[200],
  },
  progressBarForeground: {
    height: 4,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    backgroundColor: theme.colors.lime[700],
  },
  rightPlaceholder: {
    width: 40,
    height: 40,
  },
});
