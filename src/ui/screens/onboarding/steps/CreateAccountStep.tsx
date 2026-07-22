
import { ApiError, ErrorCode, getErrorMessage } from '@/app/errors/apiErrors';
import { AuthService } from '@/app/services/AuthService';
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { OnboardingSchema, OnboardingSchemaOutput } from '@/ui/screens/onboarding/schema';
import { isAxiosError } from 'axios';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInput, View } from 'react-native';

export function CreateAccountStep() {

  const {
    control,
    setError,
    handleSubmit: RHFHandleSubmit,
    formState: { isValid, isSubmitting },
  } = useFormContext<OnboardingSchema, unknown, OnboardingSchemaOutput>();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handleSubmit = RHFHandleSubmit(async (data) => {
    try {

      const response = await AuthService.signUp(data);
      console.log(response);

    } catch (error) {
      if (isAxiosError<ApiError>(error)) {

        const code = error.response?.data.error.code as ErrorCode | undefined;
        const message = getErrorMessage(code);

        if (code === 'EMAIL_ALREADY_IN_USE') {
          setError('account.email', { type: 'api', message });
        } else {
          setError('root.api', { message });
        }
      }
    }

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
            render={({ field, fieldState, formState }) => (
              <FormGroup label='Confirmar Senha' error={
                fieldState.error?.message ||
                formState.errors.root?.api.message
              }>
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
            isLoading={isSubmitting}
            disabled={!isValid}
            onPress={handleSubmit}
          >
            Criar Conta
          </ButtonApp>
        </View>
      </StepFooter>
    </Step>
  );
}
