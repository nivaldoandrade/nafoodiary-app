import { theme } from '@/ui/styles/theme';
import { cva, VariantProps } from '@/ui/styles/utils/cva';

export const avatar = cva({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.lime[500],
  },
  variants: {
    size: {
      default: {
        width: 48,
        height: 48,
        borderRadius: 24,
      },
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;
