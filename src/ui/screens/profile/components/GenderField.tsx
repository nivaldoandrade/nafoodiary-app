import { Gender } from '@/app/types/Gender';
import { FormGroup } from '@/ui/components/FormGroup';
import { RadioGroup, RadioGroupItem, RadioGroupItemIcon, RadioGroupItemLabel } from '@/ui/components/RadioGroup';
import { ProfileSchema } from '@/ui/screens/profile/schema';
import { Controller, useFormContext } from 'react-hook-form';

export function GenderField() {
  const { control } = useFormContext<ProfileSchema>();

  return (
    <Controller
      name='gender'
      control={control}
      render={({ field }) => (
        <FormGroup label='Sexo'>
          <RadioGroup value={field.value} onChange={field.onChange} isHorizontal>
            <RadioGroupItem value={Gender.MALE}>
              <RadioGroupItemIcon>👱‍♂️</RadioGroupItemIcon>
              <RadioGroupItemLabel>Masculino</RadioGroupItemLabel>
            </RadioGroupItem>
            <RadioGroupItem value={Gender.FEMALE}>
              <RadioGroupItemIcon>👩</RadioGroupItemIcon>
              <RadioGroupItemLabel>Feminino</RadioGroupItemLabel>
            </RadioGroupItem>
          </RadioGroup>
        </FormGroup>
      )}
    />
  );
}
