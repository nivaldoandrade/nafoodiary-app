
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { TextInputProps } from 'react-native';

type NameInputProps = Omit<TextInputProps, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function NameInput({
  value,
  onChange,
  error,
  disabled = false,
  ...props
}: NameInputProps) {

  return (
    <FormGroup
      label='Nome'
      error={error}
    >
      <InputApp
        placeholder='John Doe'
        inputMode='text'
        autoCapitalize='words'
        autoComplete='name'
        value={value}
        onChangeText={onChange}
        disabled={disabled}
        {...props}
      />
    </FormGroup>
  );
}
