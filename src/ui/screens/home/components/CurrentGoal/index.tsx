import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { MacroRainbow } from '@/ui/components/MacroRainbow';
import { styles } from '@/ui/screens/home/components/CurrentGoal/styles';
import { useHomeContext } from '@/ui/screens/home/context/useHomeContext';
import { theme } from '@/ui/styles/theme';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { useMemo } from 'react';
import { View } from 'react-native';

export function CurrentGoal() {
  const { isLoading } = useHomeContext();
  const { meals, selectedDate, onNextDate, onPrevDate } = useHomeContext();

  const { account } = useAccount({ enabled: false });

  const summary = useMemo(() => {
    const result = meals.flatMap(meal => meal.foods).reduce((acc, item) => {
      acc.calories += item.calories;
      acc.proteins = acc.proteins + item.proteins;
      acc.carbohydrates += item.carbohydrates;
      acc.fats += item.fats;

      return acc;
    }, {
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
    });

    return {
      calories: Math.round(result.calories),
      proteins: parseFloat(result.proteins.toFixed(1)),
      carbohydrates: parseFloat(result.carbohydrates.toFixed(1)),
      fats: parseFloat(result.fats.toFixed(1)),
    };
  }, [meals]);

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <ButtonApp
          size='icon'
          intent='ghost'
          disabled={isLoading}
          onPress={onPrevDate}
        >
          <ChevronLeftIcon />
        </ButtonApp>
        <AppText
          color={theme.colors.gray[700]}
          weight='medium'
          style={{ letterSpacing: 1.28, textAlign: 'center' }}
        >
          {formatDateLabel(selectedDate)}
        </AppText>
        <ButtonApp
          size='icon'
          intent='ghost'
          disabled={isLoading}
          onPress={onNextDate}
        >
          <ChevronRightIcon />
        </ButtonApp>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <MacroRainbow
          mode='progress'
          calories={{ current: summary.calories, goal: account!.goal.calories }}
          protein={{ current: summary.proteins, goal: account!.goal.proteins }}
          carbs={{ current: summary.carbohydrates, goal: account!.goal.carbohydrates }}
          fat={{ current: summary.fats, goal: account!.goal.fats }}
          colorText={theme.colors.gray[700]}
        />
      </View>
    </View>
  );
}

function formatDateLabel(date: Date) {
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const dateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: isToday ? undefined : 'long',
    day: 'numeric',
    month: 'long',
  }).format(date).toUpperCase();

  return isToday ? `HOJE, ${dateFormatted}` : dateFormatted;
}
