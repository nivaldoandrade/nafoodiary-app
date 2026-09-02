import { AppText } from '@/ui/components/AppText';
import { input, InputVariant, styles } from '@/ui/components/Input/styles';
import { theme } from '@/ui/styles/theme';
import { useState } from 'react';
import { BlurEvent, FocusEvent, TextInput, TextInputProps, View } from 'react-native';

type InputAppProps = Omit<TextInputProps, 'readOnly'> & InputVariant & {
  error?: boolean;
  Component?: React.ComponentType<TextInputProps>;
  ref?: React.RefObject<TextInput | null>;
  sufix?: string;
};

export function InputApp({
  intent,
  disabled,
  error,
  Component = TextInput,
  style,
  onFocus,
  onBlur,
  sufix,
  ...props
}: InputAppProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleOnFocus(e: FocusEvent) {
    setIsFocused(true);
    onFocus?.(e);
  }

  function handleOnBlur(e: BlurEvent) {
    setIsFocused(false);
    onBlur?.(e);
  }

  function getInputStatus(): InputVariant['intent'] {
    if (error) {
      return 'error';
    }

    if (isFocused) {
      return 'focus';
    };

    return 'default';
  }

  return (
    <View style={styles.container}>
      <Component
        placeholderTextColor={theme.colors.gray[700]}
        style={[
          input({ intent: getInputStatus(), disabled }),
          style,
        ]}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        readOnly={disabled}
        {...props}
      />
      {sufix && (
        <AppText
          color={theme.colors.gray[700]}
          style={styles.sufix}
        >
          {sufix}
        </AppText>
      )}
    </View>
  );
}
