import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { HeaderForgotAndResetPassword } from '@/ui/screens/forgotPassword/components/HeaderForgotAndResetPassword';
import { styles } from '@/ui/screens/forgotPassword/styles';
import { useForgotPassword } from '@/ui/screens/forgotPassword/useForgotPassword';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ForgotPassword() {
  const {
    control,
    handleSubmit,
    isSubmitting,
    isValid,
    clearErrors,
  } = useForgotPassword();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <KeyboardAwareScrollView
        mode='layout'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.sheet, { paddingBottom: bottom }]}>
          <HeaderForgotAndResetPassword
            title='Esqueceu sua senha?'
            subtitle='Informe seu e-mail e enviaremos as instruções para redefinir sua senha.'
          />
          <View style={styles.content}>
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState, formState }) => (
                <FormGroup
                  label='E-mail'
                  error={fieldState.error?.message || formState.errors.root?.api.message}
                >
                  <InputApp
                    placeholder='john.doe@email.com.br'
                    inputMode='email'
                    autoComplete='email'
                    autoCorrect={false}
                    autoCapitalize='none'
                    returnKeyType='done'
                    onSubmitEditing={handleSubmit}
                    onBlur={field.onBlur}
                    onChangeText={(value) => {
                      field.onChange(value);
                      clearErrors('root.api');
                    }}
                    disabled={isSubmitting}
                    value={field.value}
                  />
                </FormGroup>
              )}
            />
          </View>
          <View style={styles.footer}>
            <ButtonApp
              isLoading={isSubmitting}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              Continuar
            </ButtonApp>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
