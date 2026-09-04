
import { ButtonApp } from '@/ui/components/Button';
import { GenderInput } from '@/ui/components/Inputs/GenderInput';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { ArrowRightIcon } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';

export function GenderStep() {
  const { nextStep } = useOnboarding();
  const { control, watch, trigger } = useFormContext<OnboardingSchema>();

  const selectedGender = watch('profile.gender');

  async function handleCheckAndNextStep() {
    const isValid = await trigger('profile.gender');

    if (!isValid) {
      return;
    }

    nextStep();
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu gênero?</StepTitle>
        <StepSubTitle>Seu gênero influencia no tipo da dieta</StepSubTitle>
      </StepHeader>
      <StepContent>
        <Controller
          name='profile.gender'
          control={control}
          render={({ field }) => (
            <GenderInput isLabel={false} value={field.value} onChange={field.onChange} />
          )}
        />
      </StepContent>
      <StepFooter >
        <ButtonApp
          disabled={!selectedGender}
          size='icon'
          onPress={handleCheckAndNextStep}
        >
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
