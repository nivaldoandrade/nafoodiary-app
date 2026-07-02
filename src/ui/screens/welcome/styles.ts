import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  ctaContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    overflow: 'hidden',
    marginHorizontal: 16,
    padding: 32,
    borderRadius: 20,
    gap: 24,
  },
  heading: {
    textAlign: 'center',
    letterSpacing: -0.32,
    lineHeight: 32,
  },
  ctaContent: {
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    gap: 2,
  },

});
