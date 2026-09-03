import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { ProfileSchema } from '@/ui/screens/profile/schema';
import { Controller, useFormContext } from 'react-hook-form';

export function NameField() {
  const { control, clearErrors } = useFormContext<ProfileSchema>();

  return (
    <Controller
      name='name'
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup
          label='Nome'
          error={fieldState.error?.message}
        >
          <InputApp
            placeholder='Jonh Doe'
            inputMode='text'
            autoCapitalize='words'
            autoComplete='name'
            value={field.value}
            onChangeText={(text) => {
              clearErrors('root.api');
              field.onChange(text);
            }}
          />
        </FormGroup>
      )}
    />
  );
}
