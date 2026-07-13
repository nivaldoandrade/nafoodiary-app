
import { Gender } from '@/app/types/Gender';
import { ButtonApp } from '@/ui/components/Button';
import { RadioGroup, RadioGroupItem, RadioGroupItemIcon, RadioGroupItemLabel } from '@/ui/components/RadioGroup';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { ArrowRightIcon } from 'lucide-react-native';

export function GenderStep() {

  const { nextStep } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é seu gênero?</StepTitle>
        <StepSubTitle>Seu gênero influencia no tipo da dieta</StepSubTitle>
      </StepHeader>
      <StepContent>
        <RadioGroup isHorizontal>
          <RadioGroupItem value={Gender.MALE}>
            <RadioGroupItemIcon>👱‍♂️</RadioGroupItemIcon>
            <RadioGroupItemLabel>Masculino</RadioGroupItemLabel>
          </RadioGroupItem>
          <RadioGroupItem value={Gender.FEMALE}>
            <RadioGroupItemIcon>👩</RadioGroupItemIcon>
            <RadioGroupItemLabel>Feminino</RadioGroupItemLabel>
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
