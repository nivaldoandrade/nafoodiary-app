import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppText } from '@/ui/components/AppText';
import { Avatar } from '@/ui/components/Avatar';
import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/home/components/UserHeader/styles';
import { theme } from '@/ui/styles/theme';
import { TargetIcon } from 'lucide-react-native';
import { View } from 'react-native';

export function UserHeader() {
  const { signOut } = useAuth();

  const { account } = useAccount({ enabled: false });

  return (
    <View style={styles.container}>
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
        onPress={signOut}
      >
        Metas
      </ButtonApp>
    </View>
  );
}
