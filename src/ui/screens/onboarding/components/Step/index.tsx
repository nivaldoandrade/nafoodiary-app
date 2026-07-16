import { AppText, IAppTextProps } from '@/ui/components/AppText';
import { styles } from '@/ui/screens/onboarding/components/Step/styles';
import { theme } from '@/ui/styles/theme';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Step({ style, ...props }: ViewProps) {

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      { paddingBottom: bottom },
      style,
    ]} {...props} />
  );
}

function StepHeader({ style, ...props }: ViewProps) {
  return (
    <View style={[styles.header, style]} {...props} />
  );
}

function StepTitle({ style, ...props }: IAppTextProps) {
  return (
    <AppText size='4xl' weight='semiBold' style={[styles.title, style]} {...props} />
  );
}

function StepSubTitle({ style, ...props }: IAppTextProps) {
  return (
    <AppText color={theme.colors.gray[700]} style={[styles.subTitle, style]} {...props} />
  );
}

interface IStepContent extends ViewProps {
  position?: 'center' | 'end';
}

function StepContent({
  position = 'end',
  style,
  ...props
}: IStepContent) {
  return (
    <View style={[
      styles.content,
      position === 'center' && styles.contentCenter,
      style,
    ]} {...props} />
  );
}

function StepFooter({ style, ...props }: ViewProps) {

  return (
    <View
      style={[styles.footer, style]}
      {...props}
    />
  );
}

export {
  Step,
  StepContent,
  StepFooter,
  StepHeader,
  StepSubTitle,
  StepTitle
};

