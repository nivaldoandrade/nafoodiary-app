import { Home } from '@/ui/screens/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type AppStackParamlist = {
  Home: undefined;
}

const Stack = createNativeStackNavigator<AppStackParamlist>();

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

