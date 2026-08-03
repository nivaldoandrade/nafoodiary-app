import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  svgWrapper: {
    width: '100%',
    position: 'relative',
  },
  caloriesOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  macrosRow: {
    width: '100%',
    justifyContent: 'space-between',
    gap: 30,
    flexDirection: 'row',
    marginTop: 24,
  },
  macroColumn: {
    alignItems: 'center',
  },
});
