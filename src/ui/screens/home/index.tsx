import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { View } from 'react-native';

export function Home() {

  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AppText weight="semiBold" size="4xl">
        Home Screen
      </AppText>
      <ButtonApp onPress={signOut}>Sair</ButtonApp>
    </View>
  );
}
