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

interface IMacroItem {
  label: MacroType;
  quantity: number;
  percentage: number;
}

interface IMacrosProps {
  macros: IMacroItem[];
}

export function Macros({ macros }: IMacrosProps) {

  return (
    <View style={styles.container}>
      <View style={styles.MacrosContent}>
        {macros.map((macro) => (
          <Macro key={macro.label} {...macro} />
        ))}
      </View>
      <View style={styles.BarContainer}>
        {macros.map((macro) => (
          <BarItem key={macro.label} label={macro.label} percentage={macro.percentage} />
        ))}
      </View>
    </View>
  );
}

function Macro({
  label,
  quantity,
  percentage,
}: IMacroItem) {

  const color = MACRO_COLORS[label];

  return (
    <View style={styles.macro}>
      <AppText color={theme.colors.gray[700]} style={{ opacity: 0.8 }}>
        {label}
      </AppText>
      <View style={styles.macroValues}>
        <AppText weight='medium' color={color}>{quantity}g</AppText>
        <AppText weight='medium' color={color}>({percentage}%)</AppText>
      </View>
    </View>
  );
}

function BarItem({ label, percentage }: Pick<IMacroItem, 'label' | 'percentage'>) {

  const color = MACRO_COLORS[label];

  return (
    <View style={[styles.barItem, {
      width: `${percentage}%`,
      backgroundColor: color,
    }]} />
  );
}
