import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/components/OrDivider/styles';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

export function OrDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <AppText size='xs' color={theme.colors.gray[700]}>
        ou com email
      </AppText>
      <View style={styles.line} />
    </View>
  );
}
