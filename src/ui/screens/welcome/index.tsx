
import welcomeBg from '@/ui/assets/welcome-bg/welcome.png';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { Logo } from '@/ui/components/Logo';
import { SignInBottomSheet } from '@/ui/components/SignInBottomSheet';
import { ISignInBottomSheet } from '@/ui/components/SignInBottomSheet/ISignInBottomSheet';
import { styles } from '@/ui/screens/welcome/styles';
import { theme } from '@/ui/styles/theme';
import { BlurView } from 'expo-blur';
import { useRef } from 'react';
import { ImageBackground, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const blurIntensity = Platform.select({
  ios: 30,
  android: 60,
  web: 40,
  default: 40,
});

export function Welcome() {

  const signInModalRef = useRef<ISignInBottomSheet>(null);

  const handleSignInModalOpen = () => {
    signInModalRef.current?.open();
  };

  return (
    <>
      <ImageBackground
        source={welcomeBg}
        resizeMode='cover'
        style={styles.container}
      >
        <SafeAreaView style={styles.content}>
          <Logo width={186} height={60} />
          <View>
            <BlurView
              intensity={blurIntensity}
              tint='dark'
              style={styles.ctaContainer}
            >
              <AppText
                size='4xl'
                weight='medium'
                color={theme.colors.white}
                style={styles.heading}
              >
                Controle sua dieta de forma simples
              </AppText>
              <View style={styles.ctaContent}>
                <View style={{ width: '100%' }}>
                  <ButtonApp style={{ borderRadius: 50 }}>
                    Criar Conta
                  </ButtonApp>
                </View>
                <View style={styles.signInContainer}>
                  <AppText color={theme.colors.white} >
                    Já tem conta?
                  </AppText>
                  <TouchableOpacity onPress={handleSignInModalOpen}>
                    <AppText color={theme.colors.lime[500]} weight='semiBold'>
                      Acessar conta
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SignInBottomSheet ref={signInModalRef} />
    </>
  );
}
