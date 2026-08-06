import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
    backgroundColor: theme.colors.white,
  },

  mealItem: {
    padding: 8,
    gap: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.gray[400],
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    gap: 2,
    flexShrink: 1,
  },

  macrosContainer: {
    gap: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[100],
  },

  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  macroItem: {
    flex: 1,
    gap: 4,
    alignItems: 'center',
  },

});
