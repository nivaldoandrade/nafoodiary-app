import { AppText } from '@/ui/components/AppText';
import { button, ButtonVariants, styles } from '@/ui/components/Button/styles';
import { theme } from '@/ui/styles/theme';
import { ActivityIndicator, Platform, Pressable, PressableProps, View } from 'react-native';

type ButtonProps = Omit<PressableProps, 'disabled'> & ButtonVariants & {
  isLoading?: boolean;
};

export function ButtonApp({
  children,
  intent,
  size,
  disabled,
  isLoading,
  style,
  ...props
}: ButtonProps) {
  const childrenElement = (
    typeof children === 'string'
      ? (
        <AppText weight='medium'>{children}</AppText>
      )
      : children
  );

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}
        style={({ pressed }) => [
          button({ intent, size, disabled: disabled || isLoading }),
          pressed && Platform.OS === 'ios' && { opacity: 0.7 },
          typeof style === 'function' ? style({ pressed }) : style,
        ]}
        disabled={disabled}
        {...props}
      >
        {isLoading
          ? <ActivityIndicator color={theme.colors.black[700]} />
          : childrenElement
        }
      </Pressable>
    </View>

  );
}
