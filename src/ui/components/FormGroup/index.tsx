import { AppText } from '@/ui/components/AppText';
import { theme } from '@/ui/styles/theme';
import { cloneElement } from 'react';
import { View } from 'react-native';

interface IFormGroupProps {
  label: string;
  error?: string;
  children: React.ReactElement<{ error: boolean }>;
}

export function FormGroup({
  label,
  error,
  children,
}: IFormGroupProps) {

  return (
    <View style={{ gap: 8 }}>
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
