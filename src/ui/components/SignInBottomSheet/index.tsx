import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { styles } from '@/ui/components/SignInBottomSheet/styles';
import { useSignInBottomSheet } from '@/ui/components/SignInBottomSheet/useSignInBottomSheet';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const { bottom, bottomSheetModalRef } = useSignInBottomSheet({ ref });

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
              <InputApp placeholder='E-mail' />
            </FormGroup>
            <FormGroup label='Senha'>
              <InputApp placeholder='Senha' />
            </FormGroup>
            <ButtonApp>Entrar</ButtonApp>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
