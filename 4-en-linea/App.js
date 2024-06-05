import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import RegisterLoginScreen from './Screens/RegisterLoginScreen'
import HomeNavigation from "./navigations/HomeNavigation";

const Stack = createStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName='RegisterScreen'>
        <Stack.Screen name='RegisterScreen' 
                      component={RegisterLoginScreen}
                      options={{
                        headerShown: false
                      }}/>
        <Stack.Screen name='PantallaHome'
                      component={HomeNavigation}
                      options={{
                        headerShown: false
                      }}/>
      </Stack.Navigator>
   </NavigationContainer>
  );
}



