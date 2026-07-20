
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Alert, Platform, TextInput, View } from 'react-native';

export function CreateAccountStep() {

  const {
    control,
    handleSubmit: RHFHandleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext<OnboardingSchema>();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handleSubmit = RHFHandleSubmit(async (data) => {
    if (Platform.OS === 'web') {
      alert('Acessando a conta...');
    }
    Alert.alert('Acessando a conta...');
    console.log(data);
  });

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubTitle>Para poder visualizar seu progresso</StepSubTitle>
      </StepHeader>
      <StepContent>
        <View style={{ gap: 24 }}>
          <Controller
            name='profile.name'
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup label='Nome' error={fieldState.error?.message}>
                <InputApp
                  autoFocus
                  placeholder='Jonh Doe'
                  inputMode='text'
                  autoCapitalize='words'
                  autoComplete='name'
                  onChangeText={field.onChange}
                  value={field.value}
                  returnKeyType='next'
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                />
              </FormGroup>
            )}
          />
          <Controller
            name='account.email'
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup label='E-mail' error={fieldState.error?.message}>
                <InputApp
                  ref={emailInputRef}
                  placeholder='john.doe@email.com.br'
                  inputMode='email'
                  autoComplete='email'
                  autoCorrect={false}
                  autoCapitalize='none'
                  onChangeText={field.onChange}
                  value={field.value}
                  returnKeyType='next'
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
              </FormGroup>
            )}
          />
          <Controller
            name='account.password'
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup label='Senha' error={fieldState.error?.message}>
                <InputApp
                  ref={passwordInputRef}
                  placeholder='********'
                  secureTextEntry
                  autoCorrect={false}
                  autoComplete='current-password'
                  autoCapitalize='none'
                  onChangeText={field.onChange}
                  value={field.value}
                  returnKeyType='next'
                  onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
                />
              </FormGroup>
            )}
          />
          <Controller
            name='account.confirmPassword'
            control={control}
            render={({ field, fieldState }) => (
              <FormGroup label='Confirmar Senha' error={fieldState.error?.message}>
                <InputApp
                  ref={passwordConfirmInputRef}
                  secureTextEntry
                  placeholder='********'
                  autoCorrect={false}
                  autoComplete='current-password'
                  autoCapitalize='none'
                  onChangeText={field.onChange}
                  value={field.value}
                  returnKeyType='done'
                  onSubmitEditing={handleSubmit}
                />
              </FormGroup>
            )}
          />
        </View>
      </StepContent>
      <StepFooter >
        <View style={{ width: '100%' }}>
          <ButtonApp
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit}
          >
            Criar Conta
          </ButtonApp>
        </View>
      </StepFooter>
    </Step>
  );
}
