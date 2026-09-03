import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppStackNavigatorProps } from '@/app/navigation/AppStack';
import { AppText } from '@/ui/components/AppText';
import { Avatar } from '@/ui/components/Avatar';
import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/home/components/UserHeader/styles';
import { theme } from '@/ui/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { TargetIcon } from 'lucide-react-native';
import { Platform, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function UserHeader() {
  const { navigate } = useNavigation<AppStackNavigatorProps>();
  const { top } = useSafeAreaInsets();

  const { account } = useAccount();

  return (
    <View style={[styles.container, {
      paddingTop: Platform.OS === 'android' ? top : 0,
    }]}>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => navigate('Profile')}
      >
        <Avatar name={account!.profile.name} />
        <View style={styles.userDetails}>
          <AppText color={theme.colors.gray[700]} size='sm'>
            Olá, 👋
          </AppText>
          <AppText color={theme.colors.black[700]} weight='semiBold'>
            {account!.profile.name}
          </AppText>
        </View>
      </TouchableOpacity>
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
