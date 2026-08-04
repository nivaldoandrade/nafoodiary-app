import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    marginTop: 4,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  content: {
    padding: 20,
  },

  divider: {
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.gray[200],
  },
});
