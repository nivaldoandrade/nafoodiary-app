import { AuthStackNavigatorProps, AuthStackScreenProps } from '@/app/navigation/AuthStack';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { HeaderForgotAndResetPassword } from '@/ui/screens/forgotPassword/components/HeaderForgotAndResetPassword';
import { styles } from '@/ui/screens/forgotPassword/resetPassword/styles';
import { useResetPassword } from '@/ui/screens/forgotPassword/resetPassword/useResetPassword';
import { theme } from '@/ui/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ResetPassword({ route }: AuthStackScreenProps<'ResetPassword'>) {
  const { email } = route.params;
  const navigation = useNavigation<AuthStackNavigatorProps>();
  const { top, bottom } = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    handleResendCode,
    clearErrors,
    isSubmitting,
    isValid,
    isSuccess,
    resendCountdown,
    isResending,
    canResend,
  } = useResetPassword({ email });

  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <AppText
          size='4xl'
          weight='semiBold'
          style={{ textAlign: 'center', letterSpacing: -0.32 }}
        >
          Senha redefinida
        </AppText>
        <AppText color={theme.colors.gray[700]} style={{ textAlign: 'center' }}>
          Sua senha foi atualizada com sucesso. Entre novamente para continuar.
        </AppText>
        <View style={{ width: '100%' }}>
          <ButtonApp
            onPress={() => navigation.navigate('Welcome', { prefillEmail: email })}
          >
            Fazer login
          </ButtonApp>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <KeyboardAwareScrollView
        mode='layout'
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.sheet]}>
          <HeaderForgotAndResetPassword
            title='Redefinir senha'
            subtitle={
              <>
                Digite o código enviado para
                <AppText weight='semiBold'> {email} </AppText>
                e defina sua nova senha.
              </>
            }
          />
          <View style={styles.content}>
            <View style={{ gap: 24 }}>
              <Controller
                name='confirmationCode'
                control={control}
                render={({ field, fieldState }) => (
                  <FormGroup label='Código' error={fieldState.error?.message}>
                    <InputApp
                      placeholder='000000'
                      inputMode='numeric'
                      autoComplete='one-time-code'
                      maxLength={6}
                      returnKeyType='next'
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                      onBlur={field.onBlur}
                      onChangeText={(value) => {
                        field.onChange(value);
                        clearErrors('confirmationCode');
                      }}
                      disabled={isSubmitting}
                      value={field.value}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name='password'
                control={control}
                render={({ field, fieldState }) => (
                  <FormGroup label='Nova senha' error={fieldState.error?.message}>
                    <InputApp
                      ref={passwordInputRef}
                      placeholder='********'
                      secureTextEntry
                      autoComplete='new-password'
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType='next'
                      onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      disabled={isSubmitting}
                      value={field.value}
                    />
                  </FormGroup>
                )}
              />
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field, fieldState, formState }) => (
                  <FormGroup
                    label='Confirmar nova senha'
                    error={
                      fieldState.error?.message ||
                      formState.errors.root?.api.message
                    }
                  >
                    <InputApp
                      ref={confirmPasswordInputRef}
                      placeholder='********'
                      secureTextEntry
                      autoComplete='new-password'
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType='done'
                      onSubmitEditing={handleSubmit}
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      disabled={isSubmitting}
                      value={field.value}
                    />
                  </FormGroup>
                )}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <ButtonApp
              isLoading={isSubmitting}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              Redefinir senha
            </ButtonApp>
            <TouchableOpacity
              accessibilityRole='button'
              accessibilityLabel='Reenviar código'
              accessibilityState={{ disabled: !canResend || isSubmitting }}
              disabled={!canResend || isSubmitting}
              onPress={handleResendCode}
              style={{ alignSelf: 'center', minHeight: 24, justifyContent: 'center' }}
            >
              {isResending ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <ActivityIndicator size='small' color={theme.colors.gray[700]} />
                  <AppText color={theme.colors.gray[700]} size='sm' weight='medium'>
                    Enviando...
                  </AppText>
                </View>
              ) : canResend ? (
                <AppText size='sm' weight='medium'>
                  Reenviar código
                </AppText>
              ) : (
                <AppText color={theme.colors.gray[700]} size='sm' weight='medium'>
                  Reenviar código em {resendCountdown}s
                </AppText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
