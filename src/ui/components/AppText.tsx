import { theme } from '@/ui/styles/theme';
import { Text, TextProps } from 'react-native';

export interface IAppTextProps extends TextProps {
  family?: keyof typeof theme.fontFamily;
  weight?: keyof typeof theme.fontFamily.sans;
  size?: keyof typeof theme.fontSize;
  color?: string;
}

export function AppText({
  family = 'sans',
  weight = 'regular',
  size = 'base',
  color = theme.colors.black[700],
  style,
  ...props
}: IAppTextProps) {

  return (
    <Text
      style={[
        {
          fontFamily: theme.fontFamily[family][weight],
          fontSize: theme.fontSize[size],
          color,
        },
        style,
      ]}
      {...props}
    />
  );
}
