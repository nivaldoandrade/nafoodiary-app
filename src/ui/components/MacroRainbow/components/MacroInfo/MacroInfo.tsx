import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/components/MacroRainbow/components/MacroInfo/styles';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

export type MacroData = { current: number; goal: number };
export type MacroDataFull = { goal: number };

type MacroInfoProps = {
  macro: MacroData | MacroDataFull;
  color: string;
  label: string;
  unit: string;
  isFull: boolean;
  colorText?: string;
  variant: 'calories' | 'macro';
};

export function MacroInfo({
  macro,
  color,
  label,
  unit,
  isFull,
  colorText,
  variant,
}: MacroInfoProps) {
  const isCalories = variant === 'calories';

  if (isFull) {
    return (
      <>
        <AppText
          size={isCalories ? '2xl' : 'base'}
          weight="semiBold"
          color={color}
        >
          {macro.goal}{unit}
        </AppText>
        <AppText
          size="sm"
          color={colorText ?? theme.colors.gray[700]}
          style={isCalories ? styles.caloriesLabel : styles.macroLabel}
        >
          {label}
        </AppText>
      </>
    );
  }

  const macroData = macro as MacroData;

  return (
    <>
      <View style={isCalories ? styles.caloriesRow : styles.macroValueRow}>
        <AppText
          size={isCalories ? '2xl' : 'base'}
          weight="semiBold"
          color={color}
        >
          {macroData.current}
        </AppText>
        <AppText
          size={isCalories ? 'lg' : 'base'}
          color={colorText ?? theme.colors.gray[700]}
        >
          {' / '}{macroData.goal}{unit}
        </AppText>
      </View>
      <AppText
        size="sm"
        color={colorText ?? theme.colors.gray[700]}
        style={isCalories ? styles.caloriesLabel : styles.macroLabel}
      >
        {label}
      </AppText>
    </>
  );
}
