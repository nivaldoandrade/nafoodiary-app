
import { Goal } from '@/app/types/Goal';
import { ButtonApp } from '@/ui/components/Button';
import { RadioGroup, RadioGroupItem, RadioGroupItemIcon, RadioGroupItemLabel } from '@/ui/components/RadioGroup';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { ArrowRightIcon } from 'lucide-react-native';

export function GoalStep() {

  const { nextStep } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu objetivo?</StepTitle>
        <StepSubTitle>O que você pretende alcançar com a dieta?</StepSubTitle>
      </StepHeader>
      <StepContent>
        <RadioGroup>
          <RadioGroupItem value={Goal.LOSE}>
            <RadioGroupItemIcon>🥦</RadioGroupItemIcon>
            <RadioGroupItemLabel>Perder peso</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem value={Goal.MAINTAIN}>
            <RadioGroupItemIcon>🍎</RadioGroupItemIcon>
            <RadioGroupItemLabel>Manter peso</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem value={Goal.GAIN}>
            <RadioGroupItemIcon>🍗</RadioGroupItemIcon>
            <RadioGroupItemLabel>Ganhar peso</RadioGroupItemLabel>
          </RadioGroupItem>
        </RadioGroup>
      </StepContent>
      <StepFooter >
        <ButtonApp size='icon' onPress={nextStep}>
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}
