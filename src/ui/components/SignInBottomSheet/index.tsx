import { AppText } from '@/ui/components/AppText';
import { InputApp } from '@/ui/components/Input';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { styles } from '@/ui/components/SignInBottomSheet/styles';
import { useSignInBottomSheet } from '@/ui/components/SignInBottomSheet/useSignInBottomSheet';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { Alert, View } from 'react-native';

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
          <View>
            <InputApp placeholder='E-mail' onBlur={() => Alert.alert('Teste')} />
            <InputApp placeholder='Senha' />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
