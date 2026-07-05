import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { Alert, Platform, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IUseSignInBottomSheet {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheet({ ref }: IUseSignInBottomSheet) {
  const { bottom } = useSafeAreaInsets();

  const passwordInputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        bottomSheetModalRef.current?.present();
      },
    };
  }, []);

  function handleSubmit() {
    if (Platform.OS === 'web') {
      alert('Acessando a conta...');
    }
    Alert.alert('Acessando a conta...');
  }

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    handleSubmit,
  };
}
