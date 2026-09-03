import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/profile/components/BirthDateBottomSheet/styles';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import DateTimePicker, { DateTimePickerChangeEvent } from '@react-native-community/datetimepicker';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IBirthDateBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  value: Date;
  onChange: (event: DateTimePickerChangeEvent, date?: Date) => void;
}

export function BirthDateBottomSheet({
  bottomSheetRef,
  value,
  onChange,
}: IBirthDateBottomSheetProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheetModal ref={bottomSheetRef}>
      <BottomSheetView style={[styles.container, { paddingBottom: bottom }]}>
        <View style={styles.header}>
          <AppText size='xl' weight='semiBold' style={{ letterSpacing: -0.4 }}>
            Data de Nascimento
          </AppText>
          <ButtonApp
            intent='ghost'
            size='default'
            style={styles.headerButton}
            onPress={() => bottomSheetRef.current?.dismiss()}
          >
            Concluir
          </ButtonApp>
        </View>
        <View style={styles.picker}>
          <DateTimePicker
            value={value}
            mode='date'
            display='spinner'
            onValueChange={onChange}
            maximumDate={new Date()}
            style={Platform.OS === 'ios' ? { height: 180 } : undefined}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
