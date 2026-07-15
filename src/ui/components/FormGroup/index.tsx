import { AppText } from '@/ui/components/AppText';
import { theme } from '@/ui/styles/theme';
import { cloneElement } from 'react';
import { View, ViewStyle } from 'react-native';

interface IFormGroupProps {
  label: string;
  error?: string;
  children: React.ReactElement<{ error: boolean }>;
  style?: ViewStyle;
}

export function FormGroup({
  label,
  error,
  children,
  style,
}: IFormGroupProps) {

  return (
    <View style={[{ gap: 8 }, style]}>
      <AppText weight='medium'>
        {label}
      </AppText>
      {cloneElement(children, { error: !!error })}
      {error && (
        <AppText size='sm' color={theme.colors.support.red}>
          {error}
        </AppText>
      )}

    </View>
  );
}
