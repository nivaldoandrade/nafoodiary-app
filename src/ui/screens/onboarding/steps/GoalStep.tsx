
import { ButtonApp } from '@/ui/components/Button';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { ArrowRightIcon } from 'lucide-react-native';

export function GoalStep() {

  const {
    currentStepIndex,
    nextStep,
    previousStep,
  } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>
          Qual é seu objetivo?
        </StepTitle>
        <StepSubTitle>
          O que você pretende alcançar com a dieta?
        </StepSubTitle>
      </StepHeader>
      <StepContent />
      <StepFooter >
        <ButtonApp size='icon'>
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
