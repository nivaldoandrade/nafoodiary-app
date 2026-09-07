import { AppText } from '@/ui/components/AppText';
import { BirthDateBottomSheet } from '@/ui/components/BirthDate/BirthDateBottomSheet';
import { useBirthDate } from '@/ui/components/BirthDate/useBirthDate';
import { ButtonApp } from '@/ui/components/Button';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { OnboardingSchema } from '@/ui/screens/onboarding/schema';
import { theme } from '@/ui/styles/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ArrowRightIcon } from 'lucide-react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { Platform, TouchableOpacity, View } from 'react-native';

export function BirthDateStep() {
  const { nextStep } = useOnboarding();
  const {
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<OnboardingSchema>();

  const {
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
  } = useBirthDate<OnboardingSchema>('profile.birthDate');

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

  return (
    <Step>
      <StepHeader>
        <StepTitle>Que dia você nasceu?</StepTitle>
        <StepSubTitle>Cada faixa etária responde de forma única</StepSubTitle>
      </StepHeader>
      <StepContent position='center'>
        <Controller
          name='profile.birthDate'
          control={control}
          render={({ field, fieldState }) => {
            const selectedDate = field.value ?? new Date();
            return (
              <View>
                <TouchableOpacity onPress={openPicker}>
                  <AppText
                    weight='semiBold'
                    size='4xl'
                    color={theme.colors.gray[700]}
                    style={{ textAlign: 'center' }}
                  >
                    {formatDateForInput(selectedDate)}
                  </AppText>
                </TouchableOpacity>

                {Platform.OS === 'web' && (
                  <input
                    ref={inputRef}
                    type='date'
                    value={toDateInputValue(selectedDate)}
                    onChange={onWebChange}
                    role='textbox'
                    max={toDateInputValue(new Date())}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      top: 10,
                      pointerEvents: 'none',
                      opacity: 0,
                    }}
                  />
                )}

                {(showMobilePicker && Platform.OS === 'android') && (
                  <DateTimePicker
                    value={selectedDate}
                    mode='date'
                    display='calendar'
                    onValueChange={onMobileChange}
                    onDismiss={onMobileDismiss}
                    maximumDate={new Date()}
                  />
                )}

                {Platform.OS === 'ios' && (
                  <BirthDateBottomSheet
                    bottomSheetRef={bottomSheetRef}
                    value={selectedDate}
                    onChange={onMobileChange}
                  />
                )}

                {fieldState.error && (
                  <AppText
                    weight='semiBold'
                    color={theme.colors.support.red}
                    style={{ textAlign: 'center' }}
                  >
                    {fieldState.error.message}
                  </AppText>
                )}
              </View>
            );
          }}
        />
      </StepContent>
      <StepFooter>
        <ButtonApp
          disabled={!!errors.profile?.birthDate}
          size='icon'
          onPress={handleCheckAndNextStep}
        >
          <ArrowRightIcon />
        </ButtonApp>
      </StepFooter>
    </Step>
  );
}

function formatDateForInput(value: Date) {
  return new Intl.DateTimeFormat('pt-BR').format(value);
}
