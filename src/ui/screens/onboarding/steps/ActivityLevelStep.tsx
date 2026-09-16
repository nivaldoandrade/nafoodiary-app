
import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { ErrorCode, getApiErrorCode, getErrorMessage } from '@/app/errors/apiErrors';
import { useSocialAuth } from '@/app/hooks/useSocialAuth';
import { AuthService } from '@/app/services/AuthService';
import { ActivityLevel } from '@/app/types/ActivityLevel';
import { ButtonApp } from '@/ui/components/Button';
import { RadioGroup, RadioGroupItem, RadioGroupItemDescription, RadioGroupItemIcon, RadioGroupItemInfo, RadioGroupItemLabel } from '@/ui/components/RadioGroup';
import { Step, StepContent, StepFooter, StepHeader, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { ArrowRightIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from '@/app/libs/sonner';

export function ActivityLevelStep() {
  const { nextStep, isLastStep } = useOnboarding();
  const { shouldShowOnboarding, completeOnboarding, signInWithSocial } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const reauthAttemptedRef = useRef(false);

  const { signInWithGoogle, isLoading: isGoogleLoading } = useSocialAuth({
    onSuccess: handleGoogleOnSuccess,
  });

  const { control, trigger, watch, getValues } = useFormContext<OnboardingSchema>();

  const selectedActivityLevel = watch('profile.activityLevel');

  async function handleGoogleOnSuccess(response: AuthService.SignInWithSocial['response']) {
    const isOnboarded = await signInWithSocial(response);

    if (isOnboarded) {
      return;
    }

    await submitOnboarding();
  }

  async function submitOnboarding() {
    const profile = getValues('profile');

    await completeOnboarding({
      birthDate: profile.birthDate.toISOString().split('T')[0],
      height: Number(profile.height),
      weight: Number(profile.weight),
      gender: profile.gender,
      goal: profile.goal,
      activityLevel: profile.activityLevel,
    });
  }

  async function handleCheckAndNextStep() {
    const isValid = await trigger('profile.activityLevel');

    if (!isValid) {
      return;
    }

    if (isLastStep && shouldShowOnboarding) {
      await finishGoogleOnboarding();
      return;
    }

    nextStep();
  }

  async function finishGoogleOnboarding() {
    setIsSubmitting(true);
    try {
      await submitOnboarding();
    } catch (error) {
      if (
        getApiErrorCode(error) === ErrorCode.INVALID_GRANT
        && !reauthAttemptedRef.current
      ) {
        reauthAttemptedRef.current = true;
        await signInWithGoogle();
        return;
      }

      toast.error(getErrorMessage(getApiErrorCode(error)));
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={!selectedActivityLevel || isSubmitting || isGoogleLoading}
          isLoading={isSubmitting || isGoogleLoading}
          size='icon'
          onPress={handleCheckAndNextStep}
        >
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
