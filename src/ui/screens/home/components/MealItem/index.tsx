import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/screens/home/components/MealItem/styles';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

export function MealItem() {

  return (
    <View style={styles.container}>
      <AppText color={theme.colors.gray[700]} style={{ opacity: 0.8 }}>
        12h15
      </AppText>
      <View style={styles.mealItem}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <AppText>🍞</AppText>
          </View>
          <View style={styles.info}>
            <AppText
              color={theme.colors.gray[700]}
              size='sm'
              numberOfLines={1}
            >
              Café da manhã
            </AppText>
            <AppText weight='medium' numberOfLines={1} >
              Pão, manteiga e café
            </AppText>
          </View>
        </View>
        <View style={styles.macrosContainer}>
          <View style={styles.macrosRow}>
            <View style={styles.macroItem}>
              <MacroValue color={theme.colors.support.tomato}>
                210
              </MacroValue>
              <MacroLabel>Kcal</MacroLabel>
            </View>
            <View style={styles.macroItem}>
              <MacroValue color={theme.colors.support.teal}>
                5g
              </MacroValue>
              <MacroLabel>Proteínas</MacroLabel>
            </View>
          </View>
          <View style={styles.macrosRow}>
            <View style={styles.macroItem}>
              <MacroValue color={theme.colors.support.yellow}>
                25g
              </MacroValue>
              <MacroLabel>Carboidratos</MacroLabel>
            </View>
            <View style={styles.macroItem}>
              <MacroValue color={theme.colors.support.orange}>
                9g
              </MacroValue>
              <MacroLabel>Gorduras</MacroLabel>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

interface IMacroValueProps {
  children: React.ReactNode;
  color: string;
}

function MacroValue({ color, children }: IMacroValueProps) {

  return (
    <AppText color={color} weight='medium'>{children}</AppText>
  );
}

function MacroLabel({ children }: { children: React.ReactNode }) {

  return (
    <AppText color={theme.colors.gray[700]} style={{ opacity: 0.8 }}>
      {children}
    </AppText>
  );
}

