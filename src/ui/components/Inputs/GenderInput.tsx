import { Gender } from '@/app/types/Gender';
import { FormGroup } from '@/ui/components/FormGroup';
import { RadioGroup, RadioGroupItem, RadioGroupItemIcon, RadioGroupItemLabel } from '@/ui/components/RadioGroup';

interface IGenderInputProps {
  isLabel?: boolean;
  value: Gender;
  onChange: (value: Gender) => void;
  disabled?: boolean;
}

export function GenderInput({
  isLabel = true,
  value,
  onChange,
  disabled = false,
}: IGenderInputProps) {

  return (
    <FormGroup label={isLabel ? 'Sexo' : undefined}>
      <RadioGroup value={value} onChange={onChange} isHorizontal>
        <RadioGroupItem disabled={disabled} value={Gender.MALE}>
          <RadioGroupItemIcon>👱‍♂️</RadioGroupItemIcon>
          <RadioGroupItemLabel>Masculino</RadioGroupItemLabel>
        </RadioGroupItem>
        <RadioGroupItem disabled={disabled} value={Gender.FEMALE}>
          <RadioGroupItemIcon>👩</RadioGroupItemIcon>
          <RadioGroupItemLabel>Feminino</RadioGroupItemLabel>
        </RadioGroupItem>
      </RadioGroup>
    </FormGroup>
  );
}
