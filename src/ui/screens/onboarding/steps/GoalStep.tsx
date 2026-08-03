
import { ButtonApp } from '@/ui/components/Button';
import { RadioGroup, RadioGroupItem, RadioGroupItemIcon, RadioGroupItemLabel } from '@/ui/components/RadioGroup';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { goalInfo } from '@/ui/utils/goal';
import { ArrowRightIcon } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';

export function GoalStep() {
  const { nextStep } = useOnboarding();

  const { control, watch, trigger } = useFormContext<OnboardingSchema>();

  const selectedGoal = watch('profile.goal');

  async function handleCheckAndNextStep() {
    const isValid = await trigger('profile.goal');

    if (!isValid) {
      return;
    }

    nextStep();
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu objetivo?</StepTitle>
        <StepSubTitle>O que você pretende alcançar com a dieta?</StepSubTitle>
      </StepHeader>
      <StepContent>
        <Controller
          name='profile.goal'
          control={control}
          render={({ field }) => (
            <RadioGroup value={field.value} onChange={field.onChange}>
              {goalInfo.map((goal) => (
                <RadioGroupItem key={goal.value} value={goal.value}>
                  <RadioGroupItemIcon>{goal.icon}</RadioGroupItemIcon>
                  <RadioGroupItemLabel>{goal.label}</RadioGroupItemLabel>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          )}
        />

      </StepContent>
      <StepFooter >
        <ButtonApp
          disabled={!selectedGoal}
          size='icon'
          onPress={handleCheckAndNextStep}
        >
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
