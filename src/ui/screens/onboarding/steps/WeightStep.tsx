
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { formatWeight } from '@/ui/utils/formatMeasurement';
import { ArrowRightIcon } from 'lucide-react-native';
import { useState } from 'react';

export function WeightStep() {
  const [weight, setWeight] = useState<string>();

  const { nextStep } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu peso?</StepTitle>
        <StepSubTitle>Você pode inserir uma estimativa</StepSubTitle>
      </StepHeader>
      <StepContent position='center'>
        <FormGroup label='Peso (kg)' style={{ width: '100%' }} >
          <InputApp
            autoFocus
            placeholder='89'
            inputMode='decimal'
            onChangeText={(v) => setWeight(formatWeight(v))}
            value={weight}
            returnKeyType='next'
            onSubmitEditing={nextStep}
          />
        </FormGroup>
      </StepContent>
      <StepFooter >
        <ButtonApp size='icon' onPress={nextStep}>
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
