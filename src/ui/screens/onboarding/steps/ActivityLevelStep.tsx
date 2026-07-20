
import { ActivityLevel } from '@/app/types/ActivityLevel';
import { ButtonApp } from '@/ui/components/Button';
import { RadioGroup, RadioGroupItem, RadioGroupItemDescription, RadioGroupItemIcon, RadioGroupItemInfo, RadioGroupItemLabel } from '@/ui/components/RadioGroup';
import { Step, StepContent, StepFooter, StepHeader, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { ArrowRightIcon } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';

export function ActivityLevelStep() {
  const { nextStep } = useOnboarding();

  const { control, trigger, watch } = useFormContext<OnboardingSchema>();

  const selectedActivityLevel = watch('profile.activityLevel');

  async function handleCheckAndNextStep() {
    const isValid = await trigger('profile.activityLevel');

    if (!isValid) {
      return;
    }

    nextStep();
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual seu nível de atividade?</StepTitle>
      </StepHeader>
      <StepContent>
        <Controller
          name='profile.activityLevel'
          control={control}
          render={({ field }) => (
            <RadioGroup value={field.value} onChange={field.onChange}>
              <RadioGroupItem value={ActivityLevel.SENDENTARY}>
                <RadioGroupItemIcon>😴</RadioGroupItemIcon>
                <RadioGroupItemInfo>
                  <RadioGroupItemLabel>Sedentário</RadioGroupItemLabel>
                  <RadioGroupItemDescription>Não me exercito</RadioGroupItemDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>
              <RadioGroupItem value={ActivityLevel.LIGHT}>
                <RadioGroupItemIcon>🙂</RadioGroupItemIcon>
                <RadioGroupItemInfo>
                  <RadioGroupItemLabel>Leve</RadioGroupItemLabel>
                  <RadioGroupItemDescription>1 a 2 vezes por semana</RadioGroupItemDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>
              <RadioGroupItem value={ActivityLevel.MODERATE}>
                <RadioGroupItemIcon>🤨</RadioGroupItemIcon>
                <RadioGroupItemInfo>
                  <RadioGroupItemLabel>Moderado</RadioGroupItemLabel>
                  <RadioGroupItemDescription>3 a 5 vezes por semana</RadioGroupItemDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>
              <RadioGroupItem value={ActivityLevel.HEAVY}>
                <RadioGroupItemIcon>🫡</RadioGroupItemIcon>
                <RadioGroupItemInfo>
                  <RadioGroupItemLabel>Pesado</RadioGroupItemLabel>
                  <RadioGroupItemDescription>6 a 7 vezes por semana</RadioGroupItemDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>
              <RadioGroupItem value={ActivityLevel.ATHELETE}>
                <RadioGroupItemIcon>🤯</RadioGroupItemIcon>
                <RadioGroupItemInfo>
                  <RadioGroupItemLabel>Atleta</RadioGroupItemLabel>
                  <RadioGroupItemDescription>2 vezes por semana</RadioGroupItemDescription>
                </RadioGroupItemInfo>
              </RadioGroupItem>
            </RadioGroup>
          )}
        />

      </StepContent>
      <StepFooter >
        <ButtonApp
          disabled={!selectedActivityLevel}
          size='icon'
          onPress={handleCheckAndNextStep}
        >
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
