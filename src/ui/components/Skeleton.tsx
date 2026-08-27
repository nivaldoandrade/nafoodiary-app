
import React, { useEffect } from 'react';
import { DimensionValue } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const COLORS = {
  light: {
    bone: ['#E1E9EE', '#F2F8FC'],
  },
  dark: {
    bone: ['#2A2A2A', '#3D3D3D'],
  },
} as const;

type ColorMode = 'light' | 'dark';

type SkeletonProps = {
  children?: React.ReactNode;
  show?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  colorMode?: ColorMode;
  radius?: number | 'square' | 'round';
};

function SkeletonItem({
  colorMode = 'light',
  radius = 8,
}: Pick<SkeletonProps, 'width' | 'height' | 'colorMode' | 'radius'>) {
  const progress = useSharedValue(0);
  const colors = COLORS[colorMode].bone;

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], colors),
  }));

  const borderRadius =
    radius === 'square' ? 0 : radius === 'round' ? 999 : radius;

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          borderRadius,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      ]}
    />
  );
}

export function Skeleton({
  children,
  show = true,
  width,
  height,
  colorMode = 'light',
  radius = 8,
}: SkeletonProps) {
  if (!show) {
    return children;
  }

  return (
    <Animated.View style={{
      width: width ?? (children ? 'auto' : '100%'),
      height: height ?? 'auto',
      position: 'relative',
    }}>
      {children}
      <SkeletonItem
        colorMode={colorMode}
        radius={radius}
      />
    </Animated.View>
  );
}
