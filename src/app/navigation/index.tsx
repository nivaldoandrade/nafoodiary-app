import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { AuthStack } from '@/app/navigation/AuthStack';
import { NavigationContainer } from '@react-navigation/native';

export function Navigation() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      {!isSignedIn && <AuthStack />}
    </NavigationContainer>
  );
}
