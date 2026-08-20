import { RootStack } from '@/app/navigation/RootStack';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';

export function Navigation() {

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <RootStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
