import { AppText } from '@/ui/components/AppText';
import { CreateMealOptions } from '@/ui/components/CreateMealOptions';
import { styles } from '@/ui/screens/home/components/ListEmpty/styles';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

export function ListEmpty() {

  return (
    <View style={styles.container}>
      <AppText color={theme.colors.gray[700]} style={{ opacity: 0.8 }}>
        Cadastre sua primeira refeição através de uma das opções abaixo:
      </AppText>
      <CreateMealOptions />
    </View>
  );
}

