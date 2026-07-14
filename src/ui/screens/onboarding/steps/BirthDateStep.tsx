
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { theme } from '@/ui/styles/theme';
import DateTimePicker, { DateTimePickerChangeEvent } from '@react-native-community/datetimepicker';
import { ArrowRightIcon } from 'lucide-react-native';
import { useRef, useState, type ChangeEvent } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

export function BirthDateStep() {
  const [selectedDate, setDate] = useState<Date>(new Date());
  const [showMobilePicker, setShowMobilePicker] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { nextStep } = useOnboarding();

  function onMobileChange(_event: DateTimePickerChangeEvent, newSelectedDate: Date) {
    if (newSelectedDate) {
      setDate(newSelectedDate);
    }

    if (Platform.OS === 'android') {
      setShowMobilePicker(false);
    }
  }

  function onWebChange(e: ChangeEvent<HTMLInputElement>) {
    const pickedDate = new Date(e.target.value);

    if (!isNaN(pickedDate.getTime())) {
      setDate(pickedDate);
    }
  }

  function openWebPicker() {
    if (Platform.OS !== 'web' || !inputRef.current) {
      setShowMobilePicker(true);
      return;
    }

    if (typeof inputRef.current.showPicker === 'function') {
      inputRef.current.showPicker();
      return;
    }

    inputRef.current.focus();
    inputRef.current.click();
  }

  return (
    <Step>
      <StepHeader>
        <StepTitle>Que dia você nasceu?</StepTitle>
        <StepSubTitle>Cada faixa etária responde de forma única</StepSubTitle>
      </StepHeader>
      <StepContent position='center'>
        {Platform.OS !== 'ios' && (
          <TouchableOpacity onPress={openWebPicker}>
            <AppText weight='semiBold' size='4xl' color={theme.colors.gray[700]}>
              {formatDateForInput(selectedDate)}
            </AppText>
          </TouchableOpacity>
        )}

        {Platform.OS === 'web' && (
          <input
            ref={inputRef}
            type='date'
            value={selectedDate.toISOString().split('T')[0]}
            onChange={onWebChange}
            role='textbox'
            style={{
              position: 'absolute',
              opacity: 0,
            }}
          />
        )}

        {(showMobilePicker && Platform.OS !== 'web') && (
          <DateTimePicker
            value={new Date(selectedDate)}
            mode='date'
            display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
            onValueChange={onMobileChange}
          />
        )}

      </StepContent>
      <StepFooter >
        <ButtonApp size='icon' onPress={nextStep}>
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}

function formatDateForInput(value: Date) {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })
    .format(value);
}

