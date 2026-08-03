import { theme } from '@/ui/styles/theme';
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  use,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { Animated } from 'react-native';
import { G, Path, Svg } from 'react-native-svg';

const STROKE_WIDTH = 12;
export const HALF_STROKE = STROKE_WIDTH / 2;
const ARC_GAP = 8;

const VIEWBOX_WIDTH = 400;
const CX = VIEWBOX_WIDTH / 2;
const VIEWBOX_HEIGHT = CX + HALF_STROKE;
const VIEWBOX = `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`;
export const SVG_ASPECT = VIEWBOX_WIDTH / VIEWBOX_HEIGHT;

type ArcGroupContextType = {
  centerX: number;
  centerY: number
};

const ArcGroupContext = createContext<ArcGroupContextType>({
  centerX: CX,
  centerY: CX,
});

type ArcGroupProps = {
  children: ReactNode;
};

export function ArcGroup({ children }: ArcGroupProps) {
  return (
    <ArcGroupContext.Provider value={{ centerX: CX, centerY: CX }}>
      <Svg width="100%" height="100%" viewBox={VIEWBOX}>
        <G>
          {Children.map(children, (child, index) =>
            isValidElement(child)
              ? cloneElement(child, { index } as React.Attributes & Partial<ArcProps>)
              : child,
          )}
        </G>
      </Svg>
    </ArcGroupContext.Provider>
  );
}

type ArcProps = {
  color: string;
  progress: number;
  mode: 'full' | 'progress';
  index?: number
};

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function Arc({ color, progress, mode, index = 0 }: ArcProps) {
  const { centerX, centerY } = use(ArcGroupContext);

  const animatedValue = useMemo(() => new Animated.Value(0), []);

  const radius = centerX - HALF_STROKE - index * (STROKE_WIDTH + ARC_GAP);
  const perimeter = Math.PI * Math.max(radius, 0);

  const arcDraw = `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`;

  const offset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [perimeter, perimeter * (1 - progress)],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animatedValue]);

  if (mode === 'full') {
    return (
      <AnimatedPath
        d={arcDraw}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={perimeter}
        strokeDashoffset={offset}
      />
    );
  }

  return (
    <G>
      <Path
        d={arcDraw}
        stroke={theme.colors.gray[200]}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        fill="none"
      />
      <AnimatedPath
        d={arcDraw}
        stroke={color}
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={perimeter}
        strokeDashoffset={offset}
      />
    </G>
  );
}
