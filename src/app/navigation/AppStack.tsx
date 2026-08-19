import { Home } from '@/ui/screens/home';
import { MealDetails } from '@/ui/screens/mealDetails';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

type AppStackParamlist = {
  Home: undefined;
  MealDetails: {
    mealId: string;
  }
}

const Stack = createNativeStackNavigator<AppStackParamlist>();

export type AppStackNavigatorProps = NativeStackNavigationProp<AppStackParamlist>;

export type AppStackScreenRouteProps<TRouteName extends keyof AppStackParamlist> = NativeStackScreenProps<AppStackParamlist, TRouteName>;

export function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MealDetails" component={MealDetails} />
    </Stack.Navigator>
  );
}

