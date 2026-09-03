import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { ProfileSchema } from '@/ui/screens/profile/schema';
import { Controller, useFormContext } from 'react-hook-form';

type MeasurementFieldProps = {
  name: 'height' | 'weight';
  label: string;
  placeholder: string;
  unit: string;
  formatter: (value: string) => string;
};

export function MeasurementField({
  name,
  label,
  placeholder,
  unit,
  formatter,
}: MeasurementFieldProps) {
  const { control, clearErrors } = useFormContext<ProfileSchema>();

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
            inputMode={name === 'height' ? 'numeric' : 'decimal'}
            value={field.value}
            onChangeText={(text) => {
              clearErrors('root.api');
              field.onChange(formatter(text));
            }}
            sufix={unit}
          />
        </FormGroup>
      )}
    />
  );
}
