import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { DateTimePickerChangeEvent } from '@react-native-community/datetimepicker';
import { ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Platform } from 'react-native';

export function useBirthDateStep() {
  const [showMobilePicker, setShowMobilePicker] = useState(true);

  const { nextStep } = useOnboarding();

  const {
    control,
    getValues,
    setValue,
    trigger,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<OnboardingSchema>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  function onMobileChange(_event: DateTimePickerChangeEvent, newSelectedDate: Date | undefined) {
    if (!newSelectedDate || isFutureDate(newSelectedDate)) {
      return;
    }

    setValue('profile.birthDate', newSelectedDate);

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
      setValue('profile.birthDate', pickedDate);
    }

    if (isFutureDate(pickedDate)) {
      setError('profile.birthDate', {
        message: 'Insira uma data de nascimento válida.',
      });
      inputRef.current?.blur();
      return;
    }

    clearErrors('profile.birthDate');
  }

  function openPicker() {
    if (Platform.OS !== 'web' || !inputRef.current) {
      setShowMobilePicker(true);
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

  async function handleCheckAndNextStep() {
    const selectedDate = getValues('profile.birthDate');

    if (!selectedDate || isFutureDate(selectedDate)) {
      return;
    }

    const isValid = await trigger('profile.birthDate');

    if (!isValid) {
      return;
    }

    nextStep();
  }

  return {
    showMobilePicker,
    inputRef,
    control,
    errors,
    openPicker,
    onMobileChange,
    onWebChange,
    handleCheckAndNextStep,
    toDateInputValue,
  };
}

