import { AppText } from '@/ui/components/AppText';
import { CurrentGoal } from '@/ui/screens/home/components/CurrentGoal';
import { styles } from '@/ui/screens/home/components/Header/styles';
import { UserHeader } from '@/ui/screens/home/components/UserHeader';
import { useHomeContext } from '@/ui/screens/home/context/useHomeContext';
import { View } from 'react-native';

export function Header() {
  const { isLoading } = useHomeContext();

  return (
    <View>
      <UserHeader />
      <View style={styles.container}>
        <View style={[styles.content, { opacity: isLoading ? 0.4 : 1 }]}>
          <CurrentGoal />
        </View>
        <View style={styles.divider} />
        <AppText
          weight='medium'
          style={{ letterSpacing: 1.28, padding: 20, paddingBottom: 16 }}
        >
          REFEIÇÕES
        </AppText>
      </View>

    </View>
  );
}
