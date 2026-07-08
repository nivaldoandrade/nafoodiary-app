import { ButtonApp } from '@/ui/components/Button';
import { styles } from '@/ui/screens/onboarding/components/onboardingHeader/styles';
import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { theme } from '@/ui/styles/theme';
import { ChevronLeftIcon } from 'lucide-react-native';
import { useEffect, useMemo } from 'react';
import { Animated, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function OnboardingHeader() {
  const { top } = useSafeAreaInsets();
  const { previousStep, currentStepIndex, totalStep } = useOnboarding();

  const widthAnimatedRef = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const currentToValue = ((currentStepIndex + 1) / totalStep) * 100;

    Animated.timing(widthAnimatedRef, {
      toValue: currentToValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [widthAnimatedRef, currentStepIndex, totalStep]);

  const widthInterpolate = widthAnimatedRef.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const borderRadiusRightInterpolate = widthAnimatedRef.interpolate({
    inputRange: [0, 99, 100],
    outputRange: [0, 0, styles.progressBarContainer.borderRadius],

  });

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <View style={styles.content}>
        <ButtonApp
          intent='ghost'
          size='icon'
          onPress={previousStep}
        >
          <ChevronLeftIcon
            size={20}
            color={theme.colors.black[700]}
          />
        </ButtonApp>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[
            styles.progressBarForeground,
            {
              width: widthInterpolate,
              borderTopRightRadius: borderRadiusRightInterpolate,
              borderBottomRightRadius: borderRadiusRightInterpolate,
            },
          ]} />
        </View>
        <View style={styles.rightPlaceholder} />
      </View>
    </View>
  );
}
