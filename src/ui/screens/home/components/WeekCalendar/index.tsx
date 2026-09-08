import { AppText } from '@/ui/components/AppText';
import { styles } from '@/ui/screens/home/components/WeekCalendar/styles';
import { useHomeContext } from '@/ui/screens/home/context/useHomeContext';
import { theme } from '@/ui/styles/theme';
import { isSameDate } from '@/ui/utils/isSameDate';
import { TouchableOpacity, View } from 'react-native';

const W_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function WeekCalendar() {
  const { selectedDate, onSelectDate } = useHomeContext();
  const today = new Date();

  const weekDays = getWeekDays(selectedDate);

  return (
    <View style={styles.container}>
      <AppText
        size='sm'
        color={theme.colors.gray[700]}
        weight='semiBold'
      >
        {formatMonthLabel(selectedDate)}
      </AppText>
      <View style={styles.row}>
        {weekDays.map((day, index) => {

          const isSelected = isSameDate(day, selectedDate);
          const isFuture = day > today && !isSameDate(day, today);

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={isFuture ? 1 : 0.5}
              onPress={() => !isFuture && onSelectDate(day)}
              style={[
                styles.dayCell,
                isSelected && styles.dayCellSelected,
              ]}
            >
              <AppText
                size='xs'
                weight='medium'
                color={theme.colors.gray[600]}
              >
                {W_LABELS[index]}
              </AppText>
              <AppText
                weight='semiBold'
                style={isFuture && styles.dayFuture}
              >
                {day.getDate()}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function getStartOfWeek(date: Date) {
  const startWeek = new Date(date);
  startWeek.setDate(startWeek.getDate() - startWeek.getDay());
  startWeek.setHours(0, 0, 0, 0);
  return startWeek;
}

function getWeekDays(selectedDate: Date): Date[] {
  const start = getStartOfWeek(selectedDate);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);

    date.setDate(start.getDate() + i);
    return date;
  });
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric',
  }).format(date).toUpperCase();
}
