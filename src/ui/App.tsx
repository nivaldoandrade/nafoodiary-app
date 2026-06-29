import { Welcome } from '@/ui/screens/welcome';
import {
  HostGrotesk_300Light,
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  useFonts,
} from '@expo-google-fonts/host-grotesk';
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
    <>
      <SafeAreaProvider>
        <Welcome />
      </SafeAreaProvider >
    </>
  );
}
