import { AppText } from '@/ui/components/AppText';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { EditGoalSchema } from '@/ui/screens/editGoals/schema';
import { theme } from '@/ui/styles/theme';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

type GoalInputFieldProps = {
  name: keyof EditGoalSchema;
  label: string;
  unit: string;
  placeholder?: string;
  disabled?: boolean
  errorApi?: string;
};

export function GoalInputField({
  name,
  label,
  unit,
  placeholder,
  disabled = false,
  errorApi,
}: GoalInputFieldProps) {
  const { control, clearErrors } = useFormContext<EditGoalSchema>();

  return (
    <View style={{ gap: 8 }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormGroup
            label={label}
            error={fieldState.error?.message}
          >
            <InputApp
              placeholder={placeholder}
              inputMode='numeric'
              value={String(field.value)}
              onChangeText={(text) => {
                clearErrors('root.api');
                const parsed = parseInt(text, 10);
                field.onChange(isNaN(parsed) ? '' : parsed);
              }}
              returnKeyType='none'
              disabled={disabled}
              sufix={unit}
            />
          </FormGroup>
        )}
      />
      {
        errorApi && (
          <AppText size='sm' color={theme.colors.support.red}>
            {errorApi}
          </AppText>
        )
      }
    </View>
  );
}
