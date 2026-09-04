
import { ButtonApp } from '@/ui/components/Button';
import { MeasurementField } from '@/ui/components/Inputs/MeasurementField';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { formatHeight } from '@/ui/utils/formatMeasurement';
import { ArrowRightIcon } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';

export function HeightStep() {
  const { nextStep } = useOnboarding();

  const { control, trigger, watch, clearErrors } = useFormContext<OnboardingSchema>();

  const selectedHeight = watch('profile.height');

  async function handleCheckAndNextStep() {
    const isValid = await trigger('profile.height');

    if (!isValid) {
      return;
    }

    nextStep();
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é sua altura?</StepTitle>
        <StepSubTitle>Você pode inserir uma estimativa</StepSubTitle>
      </StepHeader>
      <StepContent position='center'>
        <Controller
          name='profile.height'
          control={control}
          render={({ field, fieldState }) => (
            <MeasurementField
              autoFocus
              name='height'
              placeholder='175'
              unit='cm'
              value={field.value}
              onChange={(value) => {
                clearErrors('root.api');
                field.onChange(formatHeight(value));
              }}
              error={fieldState.error?.message}
              returnKeyType='next'
              onSubmitEditing={handleCheckAndNextStep}
            />
          )}
        />
      </StepContent>
      <StepFooter >
        <ButtonApp
          disabled={!selectedHeight}
          size='icon'
          onPress={handleCheckAndNextStep}
        >
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
