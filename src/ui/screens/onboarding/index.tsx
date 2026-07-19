import { OnboardingStack } from '@/app/navigation/OnboardingStack';
import { OnboardingHeader } from '@/ui/screens/onboarding/components/onboardingHeader';
import { OnboardingProvider } from '@/ui/screens/onboarding/context';
import { onboardingSchema } from '@/ui/screens/onboarding/schema';
import { theme } from '@/ui/styles/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export function Onboarding() {
  const form = useForm({
    defaultValues: {
      profile: {
        name: '',
        height: '',
        weight: '',
        birthDate: new Date(),
      },
      account: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    },
    resolver: zodResolver(onboardingSchema),
  });

  return (
    <FormProvider {...form}>
      <OnboardingProvider>
        <KeyboardAwareScrollView
          bottomOffset={62}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: theme.colors.white,
          }}
        >
          <OnboardingHeader />
          <OnboardingStack />

        </KeyboardAwareScrollView>
      </OnboardingProvider>
    </FormProvider>
  );
}
