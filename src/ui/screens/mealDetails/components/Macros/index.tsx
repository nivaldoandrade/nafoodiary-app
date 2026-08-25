import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/screens/mealDetails/components/Macros/styles';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

type MacroType = 'Carboidratos' | 'Proteínas' | 'Gorduras';

const MACRO_COLORS: Record<MacroType, string> = {
  'Carboidratos': theme.colors.support.yellow,
  'Proteínas': theme.colors.support.teal,
  'Gorduras': theme.colors.support.orange,
};

export function Macros() {

  return (
    <View style={styles.container}>
      <View style={styles.MacrosContent}>
        <Macro
          label='Carboidratos'
          quantity={56}
          porcentage={50}
        />
        <Macro
          label='Proteínas'
          quantity={56}
          porcentage={25}
        />
        <Macro
          label='Gorduras'
          quantity={56}
          porcentage={25}
        />
      </View>
      <View>

      </View>
      <View style={styles.BarContainer}>
        <BarItem item='Carboidratos' porcentage={50} />
        <BarItem item='Proteínas' porcentage={25} />
        <BarItem item='Gorduras' porcentage={25} />
      </View>
    </View>
  );
}

interface IMacroProps {
  label: MacroType;
  quantity: number;
  porcentage: number;
}

function Macro({
  label,
  quantity,
  porcentage,
}: IMacroProps) {

  const color = MACRO_COLORS[label];

  return (
    <View style={styles.macro}>
      <AppText color={theme.colors.gray[700]} style={{ opacity: 0.8 }}>
        {label}
      </AppText>
      <AppText color={color}>{quantity}g ({porcentage}%)</AppText>
    </View>
  );
}

interface IBarProps {
  item: MacroType;
  porcentage: number;
}

function BarItem({ item, porcentage }: IBarProps) {

  const color = MACRO_COLORS[item];

  return (
    <View style={[styles.barItem, {
      width: `${porcentage}%`,
      backgroundColor: color,
    }]} />
  );
}
