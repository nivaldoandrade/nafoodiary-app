import { useAccount } from '@/app/hooks/queries/useAccount';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { MacroRainbow } from '@/ui/components/MacroRainbow';
import { styles } from '@/ui/screens/home/components/CurrentGoal/styles';
import { theme } from '@/ui/styles/theme';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

export function CurrentGoal() {
  const [selectedDate] = useState<Date>(new Date());

  const { account } = useAccount({ enabled: false });

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <ButtonApp size='icon' intent='ghost'>
          <ChevronLeftIcon />
        </ButtonApp>
        <AppText
          color={theme.colors.gray[700]}
          weight='medium'
          style={{ letterSpacing: 1.28, textAlign: 'center' }}
        >
          {formatDateLabel(selectedDate)}
        </AppText>
        <ButtonApp size='icon' intent='ghost'>
          <ChevronRightIcon />
        </ButtonApp>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <MacroRainbow
          mode='progress'
          calories={{ current: account!.goal.calories, goal: 2000 }}
          protein={{ current: account!.goal.proteins, goal: 200 }}
          carbs={{ current: account!.goal.carbohydrates, goal: 150 }}
          fat={{ current: account!.goal.fats, goal: 100 }}
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
