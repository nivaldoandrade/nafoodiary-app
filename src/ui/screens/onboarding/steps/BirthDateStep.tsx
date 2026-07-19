
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { Step, StepContent, StepFooter, StepHeader, StepSubTitle, StepTitle } from '@/ui/screens/onboarding/components/Step';
import { useBirthDateStep } from '@/ui/screens/onboarding/steps/hooks/useBirthDateStep';
import { theme } from '@/ui/styles/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ArrowRightIcon } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { Platform, TouchableOpacity, View } from 'react-native';

export function BirthDateStep() {

  const {
    showMobilePicker,
    inputRef,
    control,
    errors,
    openPicker,
    onMobileChange,
    onWebChange,
    handleCheckAndNextStep,
    toDateInputValue,
  } = useBirthDateStep();

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
          render={({ field, fieldState }) => (
            <View>
              {Platform.OS !== 'ios' && (
                <TouchableOpacity onPress={openPicker}>
                  <AppText
                    weight='semiBold'
                    size='4xl'
                    color={theme.colors.gray[700]}
                    style={{ textAlign: 'center' }}
                  >
                    {formatDateForInput(field.value)}
                  </AppText>
                </TouchableOpacity>
              )}

              {Platform.OS === 'web' && (
                <>
                  <input
                    ref={inputRef}
                    type='date'
                    value={toDateInputValue(field.value ?? new Date())}
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
                  {fieldState.error && (
                    <AppText
                      weight='semiBold'
                      color={theme.colors.support.red}
                      style={{ textAlign: 'center' }}
                    >
                      {fieldState.error.message}
                    </AppText>
                  )}
                </>
              )}

              {(showMobilePicker && Platform.OS !== 'web') && (
                <DateTimePicker
                  value={field.value}
                  mode='date'
                  display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                  onValueChange={onMobileChange}
                  maximumDate={new Date()}
                />
              )}
            </View>
          )}
        />
      </StepContent>
      <StepFooter >
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

