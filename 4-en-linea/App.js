import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from './services/AuthContext';
import RegisterLoginScreen from './Screens/RegisterLoginScreen';
import GameOverScreen from './Screens/GameOverScreen';
import HomeNavigation from "./navigations/HomeNavigation";


const Stack = createStackNavigator();

// export default function App() {
  const AppNavigator = () => {
    const { authData } = useContext(AuthContext);
  
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
          name='GameOverScreen'
          component={GameOverScreen}
          options={{ headerShown: false }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
