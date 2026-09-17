import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { useSocialAuth } from '@/app/hooks/useSocialAuth';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { GoogleIcon } from '@/ui/components/GoogleIcon';
import { InputApp } from '@/ui/components/Input';
import { OrDivider } from '@/ui/components/OrDivider';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { styles } from '@/ui/components/SignInBottomSheet/styles';
import { useSignInBottomSheet } from '@/ui/components/SignInBottomSheet/useSignInBottomSheet';
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
  initialEmail?: string;
}

export function SignInBottomSheet({
  ref,
  initialEmail,
}: ISignInBottomSheetProps) {
  const {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    handleSubmit,
    handleForgotPasswordPress,
    control,
    isSubmitting,
    isValid,
    clearErrors,
  } = useSignInBottomSheet({ ref, initialEmail });

  const { signInWithSocial } = useAuth();
  const { signInWithGoogle, isLoading: isGoogleLoading } = useSocialAuth({
    onSuccess: (response) => {
      bottomSheetModalRef.current?.dismiss();
      return signInWithSocial(response);
    },
  });

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      keyboardBlurBehavior='restore'
    >
      <BottomSheetView style={[
        styles.container,
        { paddingBottom: bottom },
      ]}>
        <AppText
          weight='semiBold'
          size='4xl'
          style={{ letterSpacing: -0.32 }}
        >
          Entre em sua conta
        </AppText>
        <ButtonApp
          intent='ghost'
          style={styles.googleButton}
          leftIcon={<GoogleIcon />}
          isLoading={isGoogleLoading}
          disabled={isGoogleLoading}
          onPress={signInWithGoogle}
        >
          Continuar com o Google
        </ButtonApp>
        <OrDivider />
        <View style={{ gap: 32 }}>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <FormGroup label='E-mail' error={fieldState.error?.message}>
                <InputApp
                  placeholder='E-mail'
                  Component={BottomSheetTextInput}
                  inputMode='email'
                  autoComplete='email'
                  autoCorrect={false}
                  autoCapitalize='none'
                  returnKeyType='next'
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  onBlur={field.onBlur}
                  disabled={isSubmitting}
                  value={field.value}
                  onChangeText={(v) => {
                    field.onChange(v);
                    clearErrors('root.api');
                  }}
                />
              </FormGroup>
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState, formState }) => (
              <FormGroup label='Senha' error={
                fieldState.error?.message ||
                formState.errors.root?.api.message
              }>
                <InputApp
                  ref={passwordInputRef}
                  placeholder='Senha'
                  Component={BottomSheetTextInput}
                  autoCorrect={false}
                  autoComplete='current-password'
                  autoCapitalize='none'
                  secureTextEntry
                  returnKeyType='done'
                  onSubmitEditing={handleSubmit}
                  disabled={isSubmitting}
                  value={field.value}
                  onChangeText={(v) => {
                    field.onChange(v);
                    clearErrors('root.api');
                  }}
                />
              </FormGroup>
            )}
          />
          <View style={{ gap: 16 }}>
            <ButtonApp
              isLoading={isSubmitting}
              disabled={!isValid}
              onPress={handleSubmit}
            >
              Entrar
            </ButtonApp>
            <TouchableOpacity
              accessibilityRole='link'
              accessibilityLabel='Esqueceu sua senha'
              disabled={isSubmitting}
              onPress={handleForgotPasswordPress}
              style={{ alignSelf: 'center', paddingVertical: 8 }}
            >
              <AppText size='sm' weight='medium'>
                Esqueceu sua senha?
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
