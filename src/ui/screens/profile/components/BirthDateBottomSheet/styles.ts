import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 10,
    gap: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    minHeight: 0,
  },

  picker: {
    alignItems: 'center',
  },
});
