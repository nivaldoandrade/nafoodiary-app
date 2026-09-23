import { Platform } from 'react-native';
import { useSafeAreaInsets as useRNSafeAreaInsets } from 'react-native-safe-area-context';

const WEB_MIN_TOP = 16;
const WEB_MIN_BOTTOM = 24;

export function useSafeAreaInsets() {
  const insets = useRNSafeAreaInsets();

  if (Platform.OS === 'web') {
    return {
      ...insets,
      top: Math.max(insets.top, WEB_MIN_TOP),
      bottom: Math.max(insets.bottom, WEB_MIN_BOTTOM),
    };
  }

  return insets;
}
