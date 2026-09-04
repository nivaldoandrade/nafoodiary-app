import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { TextInputProps } from 'react-native';

type MeasurementFieldProps = Omit<TextInputProps, 'onChange'> & {
  name: 'weight' | 'height';
  placeholder: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const LabelType: Record<MeasurementFieldProps['name'], string> = {
  'height': 'Altura',
  'weight': 'Peso',
};

export function MeasurementField({
  name,
  placeholder,
  unit,
  value,
  onChange,
  error,
  ...props
}: MeasurementFieldProps) {
  const label = LabelType[name];
  return (
    <FormGroup
      label={label}
      error={error}
    >
      <InputApp
        placeholder={placeholder}
        inputMode={name === 'height' ? 'numeric' : 'decimal'}
        value={value}
        onChangeText={onChange}
        sufix={unit}
        {...props}
      />
    </FormGroup>

  );
}
