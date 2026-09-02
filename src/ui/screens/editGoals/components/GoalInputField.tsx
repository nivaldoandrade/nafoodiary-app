import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { EditGoalSchema } from '@/ui/screens/editGoals/schema';
import { Controller, useFormContext } from 'react-hook-form';

type GoalInputFieldProps = {
  name: keyof EditGoalSchema;
  label: string;
  unit: string;
  placeholder?: string;
  disabled?: boolean
};

export function GoalInputField({
  name,
  label,
  unit,
  placeholder,
  disabled = false,
}: GoalInputFieldProps) {
  const { control, clearErrors } = useFormContext<EditGoalSchema>();

  return (
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
  );
}
