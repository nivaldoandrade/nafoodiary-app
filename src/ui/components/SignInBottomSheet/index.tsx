import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { styles } from '@/ui/components/SignInBottomSheet/styles';
import { useSignInBottomSheet } from '@/ui/components/SignInBottomSheet/useSignInBottomSheet';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
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
  } = useSignInBottomSheet({ ref });

  return (
    <BottomSheetModalProvider>
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
            <FormGroup label='E-mail'>
              <InputApp
                placeholder='E-mail'
                Component={BottomSheetTextInput}
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
                placeholder='Senha'
                Component={BottomSheetTextInput}
                autoCorrect={false}
                autoComplete='current-password'
                autoCapitalize='none'
                secureTextEntry
                returnKeyType='done'
                onSubmitEditing={handleSubmit}
              />
            </FormGroup>
            <ButtonApp onPress={handleSubmit}>
              Entrar
            </ButtonApp>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
