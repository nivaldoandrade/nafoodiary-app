import { theme } from '@/ui/styles/theme';
import { cva, VariantProps } from '@/ui/styles/utils/cva';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export const button = cva({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    intent: {
      primary: {
        backgroundColor: theme.colors.lime[500],
      },
      secondary: {
        backgroundColor: theme.colors.gray[300],
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    },
    size: {
      default: {
        paddingVertical: 14,
        paddingHorizontal: 24,
      },
      icon: {
        width: 48,
        height: 48,
        padding: 14,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
      false: {
        opacity: 1,
      },
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'default',
    disabled: false,
  },
});

export type ButtonVariants = VariantProps<typeof button>;

