import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IUseSignInBottomSheet {
  ref: React.Ref<ISignInBottomSheet>;
}

export function useSignInBottomSheet({ ref }: IUseSignInBottomSheet) {
  const { bottom } = useSafeAreaInsets();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        bottomSheetModalRef.current?.present();
      },
    };
  }, []);

  return { bottom, bottomSheetModalRef };
}
