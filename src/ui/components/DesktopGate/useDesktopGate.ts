import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

const MOBILE_MAX_WIDTH = 480;

export function useDesktopGate() {
  const [isBlocked, setIsBlocked] = useState(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      return false;
    }

    return window.innerWidth > MOBILE_MAX_WIDTH;
  });

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      return;
    }

    const updateIsBlocked = () => {
      setIsBlocked(window.innerWidth > MOBILE_MAX_WIDTH);
    };

    updateIsBlocked();
    window.addEventListener('resize', updateIsBlocked);

    return () => {
      window.removeEventListener('resize', updateIsBlocked);
    };
  }, []);

  return {
    isBlocked,
  };
}
