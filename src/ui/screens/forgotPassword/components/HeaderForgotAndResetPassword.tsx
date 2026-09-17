import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { theme } from '@/ui/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'lucide-react-native';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { AuthStackNavigatorProps } from '@/app/navigation/AuthStack';

interface IHeaderForgotAndResetPasswordProps {
  title?: string;
  subtitle?: ReactNode;
}

export function HeaderForgotAndResetPassword({
  title,
  subtitle,
}: IHeaderForgotAndResetPasswordProps) {
  const navigation = useNavigation<AuthStackNavigatorProps>();

  return (
    <View>
      <View style={{ alignItems: 'flex-start', paddingTop: 8 }}>
        <ButtonApp
          intent='ghost'
          size='icon'
          accessibilityLabel='Voltar'
          onPress={navigation.goBack}
        >
          <ChevronLeftIcon size={20} color={theme.colors.black[700]} />
        </ButtonApp>
      </View>
      {title ? (
        <View style={{ paddingVertical: 24, gap: 8 }}>
          <AppText
            size='4xl'
            weight='semiBold'
            style={{ textAlign: 'center', letterSpacing: -0.32 }}
          >
            {title}
          </AppText>
          {subtitle ? (
            <AppText color={theme.colors.gray[700]} style={{ textAlign: 'center' }}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
