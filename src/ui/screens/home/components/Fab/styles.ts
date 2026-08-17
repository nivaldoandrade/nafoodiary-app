import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 5,
  },

  bottomSheetContainer: {
    borderTopRightRadius: Platform.OS === 'web' ? 16 : undefined,
    borderTopLeftRadius: Platform.OS === 'web' ? 16 : undefined,
    elevation: 24,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 16,
  },

  bottomSheetContent: {
    paddingTop: 16,
    paddingHorizontal: 24,
    gap: 24,
  },
});
