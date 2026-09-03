import { ButtonApp } from '@/ui/components/Button';
import { HeaderApp } from '@/ui/components/HeaderApp';
import { BirthDateField } from '@/ui/screens/profile/components/BirthDateField';
import { MeasurementField } from '@/ui/screens/profile/components/MeasurementField';
import { NameField } from '@/ui/screens/profile/components/NameField';
import { GenderField } from '@/ui/screens/profile/components/GenderField';
import { styles } from '@/ui/screens/profile/styles';
import { useProfile } from '@/ui/screens/profile/useProfile';
import { theme } from '@/ui/styles/theme';
import { formatHeight, formatWeight } from '@/ui/utils/formatMeasurement';
import { useFocusEffect } from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';
import { LogOutIcon } from 'lucide-react-native';
import { useCallback } from 'react';
import { FormProvider } from 'react-hook-form';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';

export function Profile() {
  const {
    isSubmitting,
    form,
    top,
    footerHeight,
    setFooterHeight,
    bottom,
    handleSubmit,
    handleSignOut,
  } = useProfile();

  useFocusEffect(
    useCallback(() => {
      if (!(Platform.OS === 'web')) {
        return;
      }

      SystemUI.setBackgroundColorAsync(null);

    }, []),
  );

  return (
    <FormProvider {...form}>
      <View style={[styles.container, { paddingTop: top }]}>
        <HeaderApp
          title='Perfil'
          disabled={isSubmitting}
          rightIcon={LogOutIcon}
          onRightPress={handleSignOut}
        />
        <KeyboardAwareScrollView bottomOffset={footerHeight}>
          <View style={styles.content}>
            {/* <View style={styles.avatar}>
              <Avatar name={account?.profile.name ?? 'Perfil'} />
            </View> */}
            <NameField />
            <BirthDateField />
            <MeasurementField
              name='height'
              label='Altura'
              placeholder='175'
              unit='cm'
              formatter={formatHeight}
            />
            <MeasurementField
              name='weight'
              label='Peso'
              placeholder='80'
              unit='kg'
              formatter={formatWeight}
            />
            <GenderField />
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView
          onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height + bottom)}
          offset={{ opened: 30 }}
          style={{ backgroundColor: theme.colors.white }}
        >
          <View style={[styles.footer, { paddingBottom: bottom }]}>
            <ButtonApp
              disabled={!form.formState.isValid || isSubmitting}
              isLoading={isSubmitting}
              onPress={handleSubmit}
            >
              Salvar
            </ButtonApp>
          </View>
        </KeyboardStickyView>
      </View>
    </FormProvider>
  );
}
