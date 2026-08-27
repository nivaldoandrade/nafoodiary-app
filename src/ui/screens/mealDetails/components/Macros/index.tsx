import { AppText } from '@/ui/components/AppText';
import { Skeleton } from '@/ui/components/Skeleton';
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
  isLoading: boolean;
}

export function Macros({ macros, isLoading }: IMacrosProps) {

  return (
    <View style={styles.container}>
      <View style={styles.MacrosContent}>
        {macros.map((macro) => (
          <Macro key={macro.label} {...macro} isLoading={isLoading} />
        ))}
      </View>
      <Skeleton show={isLoading}>
        <View style={styles.BarContainer}>
          {macros.map((macro) => (
            <BarItem key={macro.label} label={macro.label} percentage={macro.percentage} />
          ))}
        </View>
      </Skeleton>
    </View>
  );
}

function Macro({
  label,
  quantity,
  percentage,
  isLoading,
}: IMacroItem & { isLoading: boolean }) {

  const color = MACRO_COLORS[label];

  return (
    <View style={styles.macro}>
      <AppText color={theme.colors.gray[700]} style={{ opacity: 0.8 }}>
        {label}
      </AppText>
      <View style={styles.macroValues}>
        <Skeleton show={isLoading}>
          <AppText weight='medium' color={color}>{quantity}g</AppText>
        </Skeleton>
        <Skeleton show={isLoading}>
          <AppText weight='medium' color={color}>({percentage}%)</AppText>
        </Skeleton>
      </View>
    </View>
  );
}

function BarItem({ label, percentage }: Pick<IMacroItem, 'label' | 'percentage'> & { isLoading?: boolean }) {

  const color = MACRO_COLORS[label];

  return (
    <View style={[styles.barItem, {
      width: `${percentage}%`,
      backgroundColor: color,
    }]} />
  );
}
