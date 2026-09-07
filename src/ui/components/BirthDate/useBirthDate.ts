import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { DateTimePickerChangeEvent } from '@react-native-community/datetimepicker';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FieldPath, FieldPathValue, FieldValues, useFormContext } from 'react-hook-form';
import { Keyboard, Platform } from 'react-native';

export function useBirthDate<T extends FieldValues>(fieldName: FieldPath<T>) {
  const [showMobilePicker, setShowMobilePicker] = useState(false);

  const {
    setValue,
    setError,
    clearErrors,
    control,
  } = useFormContext<T>();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    const sub = Keyboard.addListener('keyboardWillShow', () => {
      bottomSheetRef.current?.close();
    });

    return () => sub.remove();
  }, []);

  function onMobileChange(_event: DateTimePickerChangeEvent, newSelectedDate: Date | undefined) {
    if (!newSelectedDate || isFutureDate(newSelectedDate)) {
      return;
    }

    setValue(fieldName, newSelectedDate as FieldPathValue<T, FieldPath<T>>);
    clearErrors(fieldName);

    if (Platform.OS === 'android') {
      setShowMobilePicker(false);
    }
  }

  function onMobileDismiss() {
    setShowMobilePicker(false);
  }

  function onWebChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (!value) {
      return;
    }

    const [year, month, day] = value.split('-').map(Number);
    const pickedDate = new Date(year, month - 1, day);

    if (!isNaN(pickedDate.getTime())) {
      setValue(fieldName, pickedDate as FieldPathValue<T, FieldPath<T>>);
    }

    if (isFutureDate(pickedDate)) {
      setError(fieldName, {
        message: 'Insira uma data de nascimento válida.',
      });
      inputRef.current?.blur();
      return;
    }

    clearErrors(fieldName);
  }

  function openPicker() {
    Keyboard.dismiss();

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
    openPicker,
    onMobileChange,
    onWebChange,
    toDateInputValue,
    onMobileDismiss,
    isFutureDate,
    control,
  };
}
