
import { Gender } from '@/app/types/Gender';
import { ButtonApp } from '@/ui/components/Button';
import { RadioGroup, RadioGroupItem, RadioGroupItemIcon, RadioGroupItemLabel } from '@/ui/components/RadioGroup';
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
