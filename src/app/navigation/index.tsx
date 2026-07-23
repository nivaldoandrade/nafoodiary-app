import { RootStack } from '@/app/navigation/RootStack';
import { NavigationContainer } from '@react-navigation/native';

export function Navigation() {

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
