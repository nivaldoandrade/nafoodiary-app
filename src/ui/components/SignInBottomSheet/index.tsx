import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { styles } from '@/ui/components/SignInBottomSheet/styles';
import { useSignInBottomSheet } from '@/ui/components/SignInBottomSheet/useSignInBottomSheet';
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    handleSubmit,
    control,
    isSubmitting,
    isValid,
    clearErrors,
  } = useSignInBottomSheet({ ref });

  return (
    <BottomSheetModal ref={bottomSheetModalRef}>
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
          <ButtonApp
            isLoading={isSubmitting}
            disabled={!isValid}
            onPress={handleSubmit}
          >
            Entrar
          </ButtonApp>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
