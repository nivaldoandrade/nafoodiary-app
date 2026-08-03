import { Arc, ArcGroup, SVG_ASPECT } from '@/ui/components/MacroRainbow/Arc';
import { MacroInfo, type MacroData, type MacroDataFull } from '@/ui/components/MacroRainbow/components/MacroInfo/MacroInfo';
import { styles } from '@/ui/components/MacroRainbow/styles';
import { theme } from '@/ui/styles/theme';
import { View } from 'react-native';

type MacroRainbowProps = {
  colorText?: string;
} & (
    | {
      mode: 'full';
      calories: MacroDataFull;
      protein: MacroDataFull;
      carbs: MacroDataFull;
      fat: MacroDataFull;
    }
    | {
      mode: 'progress';
      calories: MacroData;
      protein: MacroData;
      carbs: MacroData;
      fat: MacroData;
    }
  );

function calcProgress(
  macro: MacroData | MacroDataFull,
  isFull: boolean,
) {

  if (isFull) {
    return 1;
  }

  const macroData = macro as MacroData;
  return Math.min(macroData.current / (macroData.goal || 1), 1);
}

export function MacroRainbow({
  calories,
  protein,
  carbs,
  fat,
  mode,
  colorText,
}: MacroRainbowProps) {
  const isFull = mode === 'full';

  const caloriesProgress = calcProgress(calories, isFull);
  const proteinProgress = calcProgress(protein, isFull);
  const carbsProgress = calcProgress(carbs, isFull);
  const fatProgress = calcProgress(fat, isFull);

  return (
    <View style={styles.container}>
      <View style={[styles.svgWrapper, { aspectRatio: SVG_ASPECT }]}>
        <ArcGroup>
          <Arc
            color={theme.colors.support.tomato}
            progress={caloriesProgress}
            mode={mode}
          />
          <Arc
            color={theme.colors.support.teal}
            progress={proteinProgress}
            mode={mode}
          />
          <Arc
            color={theme.colors.support.yellow}
            progress={carbsProgress}
            mode={mode}
          />
          <Arc
            color={theme.colors.support.orange}
            progress={fatProgress}
            mode={mode}
          />
        </ArcGroup>

        <View style={styles.caloriesOverlay}>
          <MacroInfo
            macro={calories}
            color={theme.colors.support.tomato}
            label="Calorias"
            unit="kcal"
            isFull={isFull}
            colorText={colorText}
            variant="calories"
          />
        </View>
      </View>

      <View style={styles.macrosRow}>
        <View style={styles.macroColumn}>
          <MacroInfo
            macro={protein}
            color={theme.colors.support.teal}
            label="Proteínas"
            unit="g"
            isFull={isFull}
            colorText={colorText}
            variant="macro"
          />
        </View>

        <View style={styles.macroColumn}>
          <MacroInfo
            macro={carbs}
            color={theme.colors.support.yellow}
            label="Carboidratos"
            unit="g"
            isFull={isFull}
            colorText={colorText}
            variant="macro"
          />
        </View>

        <View style={styles.macroColumn}>
          <MacroInfo
            macro={fat}
            color={theme.colors.support.orange}
            label="Gorduras"
            unit="g"
            isFull={isFull}
            colorText={colorText}
            variant="macro"
          />
        </View>
      </View>
    </View>
  );
}
