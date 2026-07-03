import { theme } from '@/ui/styles/theme';
import { cva, VariantProps } from '@/ui/styles/utils/cva';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  input: {
  },
});

export const input = cva({
  base: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    minHeight: 52,
    fontFamily: theme.fontFamily.sans.regular,
    fontSize: theme.fontSize.base,
    color: theme.colors.black[700],
  },
  variants: {
    intent: {
      default: {
        borderColor: theme.colors.gray[400],
      },
      focus: {
        borderColor: theme.colors.black[700],
      },
      error: {
        borderColor: theme.colors.support.red,
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
    intent: 'default',
    disabled: false,
  },
});

export type InputVariant = VariantProps<typeof input>;
