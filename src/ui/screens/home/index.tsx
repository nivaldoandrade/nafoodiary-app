import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { PlanSummaryModal } from '@/ui/screens/home/components/PlanSummaryModal';
import { View } from 'react-native';

export function Home() {

  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <PlanSummaryModal />
      {/* <AppText weight="semiBold" size="4xl">
        Home Screen
      </AppText>
      <ButtonApp onPress={signOut}>Sair</ButtonApp> */}
    </View>
  );
}
