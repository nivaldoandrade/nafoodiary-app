import * as SystemUI from 'expo-system-ui';

import { Logo } from '@/ui/components/Logo';
import { theme } from '@/ui/styles/theme';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

interface ISplashScreenLoader {
  visible: boolean;
}

export function SplashScreenLoader({ visible }: ISplashScreenLoader) {

  const [opacityAnimated] = useState(() => new Animated.Value(visible ? 1 : 0));

  useFocusEffect(
    useCallback(() => {
      if (!(Platform.OS === 'web' && visible)) {
        return;
      }

      SystemUI.setBackgroundColorAsync(theme.colors.lime[700]);

    }, [visible]),
  );

  useEffect(() => {
    if (!visible) {
      Animated.timing(opacityAnimated, {
        toValue: 0,
        duration: 600,
        useNativeDriver: Platform.OS === 'web' ? false : true,
      }).start();
    }
  }, [visible, opacityAnimated]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[StyleSheet.absoluteFill, {
        opacity: opacityAnimated, zIndex: 999,
      }]}
    >
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.lime[700],
        gap: 47,
      }}>
        <Logo width={187} />
        <ActivityIndicator color={theme.colors.white} />
      </View>
    </Animated.View>
  );
}
