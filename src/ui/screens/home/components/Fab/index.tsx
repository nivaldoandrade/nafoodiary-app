import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { CreateMealOptions } from '@/ui/components/CreateMealOptions';
import { styles } from '@/ui/screens/home/components/Fab/styles';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { PlusIcon } from 'lucide-react-native';
import { useRef } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Fab() {
  const { bottom } = useSafeAreaInsets();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function handleOpenCreateMealOptions() {
    bottomSheetModalRef.current?.present();
  }

  return (
    <>
      <View style={[
        styles.container,
        {
          right: Platform.OS === 'web' ? 24 : 16,
          bottom: Platform.OS === 'web' ? 32 : bottom,
        },
      ]}
      >
        <ButtonApp size='icon' onPress={handleOpenCreateMealOptions}>
          <PlusIcon size={20} />
        </ButtonApp>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          style={styles.bottomSheetContainer}
        >
          <BottomSheetView style={[
            styles.bottomSheetContent,
            { paddingBottom: Platform.OS === 'web' ? 32 : bottom },
          ]}>
            <AppText size='xl' weight='semiBold' style={{ letterSpacing: -0.4 }}>
              Cadastre sua refeição
            </AppText>
            <CreateMealOptions />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
