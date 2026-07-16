import { NavigationContainer } from '@react-navigation/native';

import { AuthStack } from '@/app/navigation/AuthStack';
import {
  HostGrotesk_300Light,
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/host-grotesk';
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
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </KeyboardProvider>
    </SafeAreaProvider >
  );
}
