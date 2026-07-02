import { AppText } from '@/ui/components/AppText';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { useSignInBottomSheet } from '@/ui/components/SignInBottomSheet/useSignInBottomSheet';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

interface ISignInBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

export function SignInBottomSheet({ ref }: ISignInBottomSheetProps) {
  const { bottom, bottomSheetModalRef } = useSignInBottomSheet({ ref });

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef}>
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <AppText>SignIn Bottom Sheet</AppText>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}
