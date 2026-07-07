
import { OnboardingParamList } from '@/app/navigation/OnboardingStack';
import { Onboarding } from '@/ui/screens/onboarding';
import { Welcome } from '@/ui/screens/welcome';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: NavigatorScreenParams<OnboardingParamList> | undefined;
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

