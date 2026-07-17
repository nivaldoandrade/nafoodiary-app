import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { signInSchema } from '@/ui/components/SignInBottomSheet/schema';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Platform, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IUseSignInBottomSheet {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheet({ ref }: IUseSignInBottomSheet) {
  const { bottom } = useSafeAreaInsets();

  const { control, handleSubmit: RHFHandleSubmit } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const passwordInputRef = useRef<TextInput>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        bottomSheetModalRef.current?.present();
      },
    };
  }, []);

  const handleSubmit = RHFHandleSubmit((data) => {
    const message = `Email: ${data.email} - Senha: ${data.password}`;
    if (Platform.OS === 'web') {
      alert(message);
    }
    Alert.alert(message);
  });

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    handleSubmit,
    control,
  };
}
