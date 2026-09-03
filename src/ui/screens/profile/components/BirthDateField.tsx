import { FormGroup } from '@/ui/components/FormGroup';
import { InputApp } from '@/ui/components/Input';
import { BirthDateBottomSheet } from '@/ui/screens/profile/components/BirthDateBottomSheet';
import { useBirthDateField } from '@/ui/screens/profile/components/hooks/useBirthDateField';
import { theme } from '@/ui/styles/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalendarDaysIcon } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { Platform, View } from 'react-native';

export function BirthDateField() {
  const {
    showMobilePicker,
    inputRef,
    bottomSheetRef,
    control,
    openPicker,
    onMobileChange,
    onWebChange,
    toDateInputValue,
  } = useBirthDateField();

  return (
    <Controller
      name='birthDate'
      control={control}
      render={({ field, fieldState }) => {
        const selectedDate = field.value ?? new Date();
        return (
          <View style={{ position: 'relative' }}>
            <FormGroup
              label='Data de Nascimento'
              error={fieldState.error?.message}
            >
              <InputApp
                placeholder='19/02/2000'
                value={field.value ? formatDateForInput(field.value) : ''}
                editable={false}
                onPress={openPicker}
                rightAdornment={
                  <CalendarDaysIcon size={20} color={theme.colors.black[700]} />
                }
              />
            </FormGroup>

            {Platform.OS === 'android' && showMobilePicker && (
              <DateTimePicker
                value={selectedDate}
                mode='date'
                display='calendar'
                onValueChange={onMobileChange}
                maximumDate={new Date()}
              />
            )}

            {Platform.OS === 'web' && (
              <input
                ref={inputRef}
                type='date'
                value={toDateInputValue(selectedDate)}
                onChange={onWebChange}
                max={toDateInputValue(new Date())}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 52,
                  bottom: 0,
                  opacity: 0,
                  pointerEvents: 'auto',
                }}
              />
            )}

            {Platform.OS === 'ios' && (
              <BirthDateBottomSheet
                bottomSheetRef={bottomSheetRef}
                value={selectedDate}
                onChange={onMobileChange}
              />
            )}
          </View>
        );
      }}
    />
  );
}

function formatDateForInput(value: Date) {
  return new Intl.DateTimeFormat('pt-BR').format(value);
}
