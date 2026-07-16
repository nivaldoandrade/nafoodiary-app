
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useRef } from 'react';
import { Alert, Platform, TextInput, View } from 'react-native';

export function CreateAccountStep() {

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  function handleSubmit() {
    if (Platform.OS === 'web') {
      alert('Acessando a conta...');
    }
    Alert.alert('Acessando a conta...');
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubTitle>Para poder visualizar seu progresso</StepSubTitle>
      </StepHeader>
      <StepContent>
        <View style={{ gap: 24 }}>
          <FormGroup label='Nome' >
            <InputApp
              autoFocus
              placeholder='Jonh Doe'
              inputMode='text'
              autoCapitalize='words'
              autoComplete='name'
              returnKeyType='next'
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          </FormGroup>
          <FormGroup label='E-mail'>
            <InputApp
              ref={emailInputRef}
              placeholder='john.doe@email.com.br'
              inputMode='email'
              autoComplete='email'
              autoCorrect={false}
              autoCapitalize='none'
              returnKeyType='next'
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </FormGroup>
          <FormGroup label='Senha'>
            <InputApp
              ref={passwordInputRef}
              placeholder='********'
              secureTextEntry
              autoCorrect={false}
              autoComplete='current-password'
              autoCapitalize='none'
              returnKeyType='next'
              onSubmitEditing={() => passwordConfirmInputRef.current?.focus()}
            />
          </FormGroup>
          <FormGroup label='Confirmar Senha'>
            <InputApp
              ref={passwordConfirmInputRef}
              placeholder='********'
              autoCorrect={false}
              autoComplete='current-password'
              autoCapitalize='none'
              secureTextEntry
              returnKeyType='done'
              onSubmitEditing={handleSubmit}
            />
          </FormGroup>
        </View>
      </StepContent>
      <StepFooter >
        <View style={{ width: '100%' }}>
          <ButtonApp onPress={handleSubmit}>Criar Conta</ButtonApp>
        </View>
      </StepFooter>
    </Step>
  );
}
