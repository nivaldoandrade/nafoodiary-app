import { theme } from '@/ui/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.welcomeFallback,
  },
  background: {
    flex: 1,
  },
  backgroundFallback: {
    ...StyleSheet.absoluteFill,
    backgroundColor: theme.colors.welcomeFallback,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  buttonsContainer: {
    width: '100%',
  },
  ctaContainer: {
    backgroundColor: theme.colors.scrim,
    marginHorizontal: 16,
    padding: 32,
    borderRadius: 20,
    gap: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors['white/16'],
  },
  heading: {
    textAlign: 'center',
    letterSpacing: -0.32,
    lineHeight: 32,
  },
  ctaContent: {
    gap: 24,
    alignItems: 'center',
  },
  primaryButtonWrapper: {
    width: '100%',
  },
  primaryButton: {
    borderRadius: 50,
  },
  signInContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  signInLink: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
});
