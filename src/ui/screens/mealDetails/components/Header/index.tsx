import { AppStackNavigatorProps } from '@/app/navigation/AppStack';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/mealDetails/components/Header/styles';
import { theme } from '@/ui/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Header() {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation<AppStackNavigatorProps>();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.leftContainer}>
        <ButtonApp
          size='icon'
          intent='ghost'
          onPress={goBack}
        >
          <ChevronLeftIcon size={20} color={theme.colors.white} />
        </ButtonApp>
        <AppText weight='medium' color={theme.colors.gray[300]}>
          Refeição
        </AppText>
      </View>

      <View style={styles.rightContainer}>
        <AppText color={theme.colors.gray[300]} style={{ opacity: 0.8 }}>
          Calorias
        </AppText>
        <AppText weight='medium' color={theme.colors.white}>630kcal</AppText>
      </View>

    </View>
  );
}
