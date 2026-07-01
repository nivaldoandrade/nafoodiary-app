
import welcomeBg from '@/ui/assets/welcome-bg/welcome.png';
import { ButtonApp } from '@/ui/components/Button';
import { Logo } from '@/ui/components/Logo';
import { styles } from '@/ui/screens/welcome/styles';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Welcome() {

  return (
    <ImageBackground
      source={welcomeBg}
      resizeMode='cover'
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        <Logo />
        <ButtonApp>Criar Conta</ButtonApp>
      </SafeAreaView>
    </ImageBackground>
  );
}
