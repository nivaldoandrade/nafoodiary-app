import { ProfileSchema } from '@/ui/screens/profile/schema';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { DateTimePickerChangeEvent } from '@react-native-community/datetimepicker';
import { ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Platform } from 'react-native';

export function useBirthDateField() {
  const [showMobilePicker, setShowMobilePicker] = useState(false);

  const {
    control,
    setValue,
    setError,
    clearErrors,
  } = useFormContext<ProfileSchema>();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function onMobileChange(_event: DateTimePickerChangeEvent, newSelectedDate: Date | undefined) {
    if (!newSelectedDate || isFutureDate(newSelectedDate)) {
      return;
    }

    setValue('birthDate', newSelectedDate);
    clearErrors('birthDate');

    if (Platform.OS === 'android') {
      setShowMobilePicker(false);
    }
  }

  function onWebChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (!value) {
      return;
    }

    const [year, month, day] = value.split('-').map(Number);
    const pickedDate = new Date(year, month - 1, day);

    if (!isNaN(pickedDate.getTime())) {
      setValue('birthDate', pickedDate);
    }

    if (isFutureDate(pickedDate)) {
      setError('birthDate', {
        message: 'Insira uma data de nascimento válida.',
      });
      inputRef.current?.blur();
      return;
    }

    clearErrors('birthDate');
  }

  function openPicker() {
    if (Platform.OS === 'ios') {
      bottomSheetRef.current?.present();
      return;
    }

    if (Platform.OS !== 'web') {
      setShowMobilePicker(true);
      return;
    }

    if (!inputRef.current) {
      return;
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    const isIOSSafari = isIOS && isSafari;

    if (typeof inputRef.current.showPicker === 'function' && !isIOSSafari) {
      inputRef.current.showPicker();
      return;
    }

    inputRef.current.focus();
    inputRef.current.click();
  }

  function isFutureDate(date: Date) {
    return getDateOnly(date) > getDateOnly(new Date());
  }

  function getDateOnly(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function toDateInputValue(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  return {
    showMobilePicker,
    inputRef,
    bottomSheetRef,
    control,
    openPicker,
    onMobileChange,
    onWebChange,
    toDateInputValue,
  };
}
