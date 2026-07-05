import { input, InputVariant } from '@/ui/components/Input/styles';
import { theme } from '@/ui/styles/theme';
import { useState } from 'react';
import { BlurEvent, FocusEvent, TextInput, TextInputProps } from 'react-native';

type InputAppProps = Omit<TextInputProps, 'readOnly'> & InputVariant & {
  error?: boolean;
  Component?: React.ComponentType<TextInputProps>;
  ref?: React.RefObject<TextInput | null>;
};

export function InputApp({
  intent,
  disabled,
  error,
  Component = TextInput,
  style,
  onFocus,
  onBlur,
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
  );
}
