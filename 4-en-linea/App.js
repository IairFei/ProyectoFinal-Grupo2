import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import RegisterLoginScreen from './Screens/RegisterLoginScreen';
import GameOverScreen from './Screens/GameOverScreen';
import GameScreen from './Screens/GameScreen';
import ProfileScreen from './Screens/ProfileScreen';
import RankingScreen from './Screens/RankingScreen';
import HomeNavigation from "./navigations/HomeNavigation";
import DetailsScreen from "./Screens/DetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='RegisterScreen'>
        <Stack.Screen 
          name='RegisterScreen' 
          component={RegisterLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='PantallaHome'
          component={HomeNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='DetailsScreen'
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='HomeScreen'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='GameOverScreen'
          component={GameOverScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='GameScreen'
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='ProfileScreen'
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name='RankingScreen'
          component={RankingScreen}
          options={{ headerShown: false }}
        />             
      </Stack.Navigator>
    </NavigationContainer>
  );
}
