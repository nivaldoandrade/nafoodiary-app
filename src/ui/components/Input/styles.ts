import { theme } from '@/ui/styles/theme';
import { cva, VariantProps } from '@/ui/styles/utils/cva';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },

  sufix: {
    minWidth: 56,
    padding: 14,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 10,
    textAlign: 'center',
  },
});

export const input = cva({
  base: {
    flex: 1,
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
