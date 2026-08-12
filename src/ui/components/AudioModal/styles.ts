import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    marginBottom: 51,
  },

  content: {
    gap: 31,
    marginBottom: 70,
    alignItems: 'center',
  },

  circle1: {
    width: 265,
    height: 265,
    borderRadius: 132.5,
    borderWidth: 1,
    borderColor: theme.colors.gray['700/10'],
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle1Recording: {
    borderColor: theme.colors.lime['600/10'],
  },

  circle2: {
    width: 227,
    height: 227,
    borderRadius: 113.5,
    borderWidth: 1,
    borderColor: theme.colors.gray['700/50'],
    alignItems: 'center',
    justifyContent: 'center',
  },

  circle2Recording: {
    borderColor: theme.colors.lime['600/50'],
  },

  circle3: {
    width: 179,
    height: 179,
    borderRadius: 89.5,
    backgroundColor: theme.colors.gray['700/10'],
  },

  circle3Recording: {
    backgroundColor: theme.colors.lime['600/10'],
  },

  exampleContent: {
    maxWidth: 192,
    alignItems: 'center',
  },

  footer: {
    alignItems: 'center',
    gap: 16,
  },

});
