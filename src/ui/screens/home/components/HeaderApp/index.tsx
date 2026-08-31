import { AppStackNavigatorProps } from '@/app/navigation/AppStack';
import { AppText } from '@/ui/components/AppText';
import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/home/components/HeaderApp/styles';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, LucideProps } from 'lucide-react-native';
import { View } from 'react-native';

interface IHeaderAppProps {
  title: string;
  rightIcon?: React.ComponentType<LucideProps>;
  disabled?: boolean;
}

export function HeaderApp({
  title,
  rightIcon:
  RighIcon,
  disabled = false,
}: IHeaderAppProps) {

  const { goBack } = useNavigation<AppStackNavigatorProps>();

  return (
    <View style={styles.container}>
      <ButtonApp
        intent='ghost'
        size='icon'
        disabled={disabled}
        onPress={goBack}
      >
        <ChevronLeftIcon size={20} />
      </ButtonApp>
      <AppText size='sm'>{title}</AppText>
      <ButtonApp
        intent='ghost'
        size='icon'
        disabled={!RighIcon || disabled}
        onPress={() => console.log('ok')}
      >
        {RighIcon && <RighIcon size={20} />}
      </ButtonApp>
    </View>
  );
}
