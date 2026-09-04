
import { ButtonApp } from '@/ui/components/Button';
import { MeasurementField } from '@/ui/components/Inputs/MeasurementField';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { formatWeight } from '@/ui/utils/formatMeasurement';
import { ArrowRightIcon } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';

export function WeightStep() {
  const { nextStep } = useOnboarding();

  const { control, trigger, watch, clearErrors } = useFormContext<OnboardingSchema>();

  const selectedWeight = watch('profile.weight');

  async function handleCheckAndNextStep() {
    const isValid = await trigger('profile.weight');

    if (!isValid) {
      return;
    }

    nextStep();
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu peso?</StepTitle>
        <StepSubTitle>Você pode inserir uma estimativa</StepSubTitle>
      </StepHeader>
      <StepContent position='center'>
        <Controller
          name='profile.weight'
          control={control}
          render={({ field, fieldState }) => (

            <MeasurementField
              autoFocus
              name='weight'
              placeholder='80'
              unit='kg'
              value={field.value}
              onChange={(value) => {
                clearErrors('root.api');
                field.onChange(formatWeight(value));
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
          disabled={!selectedWeight}
          size='icon'
          onPress={handleCheckAndNextStep}
        >
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
