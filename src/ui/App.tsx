
import { AuthProvider } from '@/app/contexts/AuthContext';
import { queryClient } from '@/app/libs/queryClient';
import { Navigation } from '@/app/navigation';
import {
  HostGrotesk_300Light,
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/host-grotesk';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded] = useFonts({
    HostGrotesk_300Light,
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <KeyboardProvider statusBarTranslucent={true} navigationBarTranslucent={true}>
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Navigation />
            </AuthProvider>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider >
  );
}
