import { useAuth } from '@/app/contexts/AuthContext/useAuth';
import { AppStack } from '@/app/navigation/AppStack';
import { AuthStack } from '@/app/navigation/AuthStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootParamList = {
  Auth: undefined;
  App: undefined;
}

const Stack = createNativeStackNavigator<RootParamList>();

export function RootStack() {

  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isSignedIn ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ animationTypeForReplace: 'pop' }}
        />
      ) : (
        <Stack.Screen name="App" component={AppStack} />
      )
      }

    </Stack.Navigator>
  );
}
