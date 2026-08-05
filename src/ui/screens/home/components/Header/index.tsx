import { AppText } from '@/ui/components/AppText';
import { CurrentGoal } from '@/ui/screens/home/components/CurrentGoal';
import { styles } from '@/ui/screens/home/components/Header/styles';
import { UserHeader } from '@/ui/screens/home/components/UserHeader';
import { View } from 'react-native';

export function Header() {
  return (
    <View>
      <UserHeader />
      <View style={styles.container}>
        <View style={styles.content}>
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
