import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { MacroRainbow } from '@/ui/components/MacroRainbow';
import { styles } from '@/ui/screens/home/components/PlanSummaryModal/styles';
import { theme } from '@/ui/styles/theme';
import { goalInfoByValue } from '@/ui/utils/goal';
import { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export function PlanSummaryModal() {
  const { isSignedUp } = useAuth();
  const [visible, setVisible] = useState(isSignedUp);

  const { account } = useAccount();

  const currentGoal = goalInfoByValue[account!.profile.goal];

  function handleClose() {
    setVisible(false);
  }

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType='fade'
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <AppText style={{ textAlign: 'center' }}>
                    {currentGoal.icon}
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
                    <Text style={styles.titleHighlight}>{currentGoal.label}</Text>
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
                <MacroRainbow
                  mode='full'
                  calories={{ goal: account!.goal.calories }}
                  protein={{ goal: account!.goal.proteins }}
                  carbs={{ goal: account!.goal.carbohydrates }}
                  fat={{ goal: account!.goal.fats }}
                  colorText={theme.colors.gray[200]}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <ButtonApp onPress={handleClose}>
                Começar meu plano
              </ButtonApp>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}
