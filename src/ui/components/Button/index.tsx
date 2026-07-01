import { AppText } from '@/ui/components/AppText';
import { button, ButtonVariants, styles } from '@/ui/components/Button/styles';
import { Platform, Pressable, PressableProps, View } from 'react-native';

type ButtonProps = Omit<PressableProps, 'disabled'> & ButtonVariants;

export function ButtonApp({
  children,
  intent,
  size,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const childrenElement = (
    typeof children === 'string'
      ? <AppText weight='medium'>{children}</AppText>
      : children
  );

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}
        style={({ pressed }) => [
          button({ intent, size, disabled }),
          pressed && Platform.OS === 'ios' && { opacity: 0.7 },
          typeof style === 'function' ? style({ pressed }) : style,
        ]}
        disabled={disabled}
        {...props}
      >
        {childrenElement}
      </Pressable>
    </View>

  );
}
