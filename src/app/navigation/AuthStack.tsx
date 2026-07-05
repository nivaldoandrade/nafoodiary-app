
import { Onboarding } from '@/ui/screens/onboarding';
import { Welcome } from '@/ui/screens/welcome';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

export type AuthStackNavigatorProps = NativeStackNavigationProp<AuthStackParamList>;

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName='Welcome'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
}

