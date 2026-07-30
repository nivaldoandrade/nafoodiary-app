import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/home/components/PlanSummaryModal/styles';
import { theme } from '@/ui/styles/theme';
import { Modal, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function PlanSummaryModal() {

  return (
    <Modal
      transparent
      statusBarTranslucent
    >
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <AppText style={{ textAlign: 'center' }}>
                    🥦
                  </AppText>
                </View>
                <View style={styles.headerContent}>
                  <AppText
                    size='4xl'
                    weight='semiBold'
                    color={theme.colors.gray[100]}
                    style={styles.title}
                  >
                    Seu plano de dieta {'\n'} para {''}
                    <Text style={styles.titleHighlight}>Perder Peso</Text>
                    {'\n'} está pronto!
                  </AppText>
                  <AppText
                    color={theme.colors.gray[600]}
                    style={{ textAlign: 'center' }}
                  >
                    Essa é a recomendação diária recomendada para seu plano.
                    Fique tranquilo, você poderá editar depois caso deseje.
                  </AppText>
                </View>
              </View>
              <View style={styles.rainbow}>

              </View>
            </View>

            <View style={styles.footer}>
              <ButtonApp>Começar meu plano</ButtonApp>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}
