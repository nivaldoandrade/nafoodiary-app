import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 24,
  },

  MacrosContent: {
    flexDirection: 'row',
    gap: 24,
  },

  macro: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },

  macroValues: {
    alignItems: 'center',
    gap: 4,
  },

  BarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 4,
  },

  barItem: {
    height: '100%',
  },

});
