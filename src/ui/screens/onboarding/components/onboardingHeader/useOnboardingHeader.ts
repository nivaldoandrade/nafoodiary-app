import { useOnboarding } from '@/ui/screens/onboarding/context/useOnboarding';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useOnboardingHeader() {
  const { top } = useSafeAreaInsets();
  const { previousStep } = useOnboarding();

  const widthAnimatedRef = useRef(new Animated.Value(0));
  const interpolatedRef = useRef<Animated.AnimatedInterpolation<string | number>>(null);

  useEffect(() => {
    if (!interpolatedRef.current) {
      interpolatedRef.current = widthAnimatedRef.current.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      });
    }

    Animated.timing(widthAnimatedRef.current, {
      toValue: 100,
      duration: 3000,
      delay: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return {
    top,
    previousStep,
    widthAnimatedRef,
    interpolatedRef,
  };
}
