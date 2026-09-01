import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppStackNavigatorProps } from '@/app/navigation/AppStack';
import { AppText } from '@/ui/components/AppText';
import { Avatar } from '@/ui/components/Avatar';
import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/home/components/UserHeader/styles';
import { theme } from '@/ui/styles/theme';
import { useNavigation } from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';
import { TargetIcon } from 'lucide-react-native';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function UserHeader() {
  const { navigate } = useNavigation<AppStackNavigatorProps>();
  const { top } = useSafeAreaInsets();

  const { signOut } = useAuth();

  const { account } = useAccount();

  function handleSignOut() {
    SystemUI.setBackgroundColorAsync(null);
    signOut();
  }

  return (
    <View style={[styles.container, {
      paddingTop: Platform.OS === 'android' ? top : 0,
    }]}>
      <View style={styles.userInfo}>
        <Avatar name={account!.profile.name} />
        <View style={styles.userDetails}>
          <AppText color={theme.colors.gray[700]} size='sm'>
            Olá, 👋
          </AppText>
          <AppText color={theme.colors.black[700]} weight='semiBold'>
            {account!.profile.name}
          </AppText>
        </View>
      </View>
      <ButtonApp
        intent='ghost'
        leftIcon={<TargetIcon />}
        onPress={() => navigate('EditGoals')}
      >
        Metas
      </ButtonApp>
    </View>
  );
}
