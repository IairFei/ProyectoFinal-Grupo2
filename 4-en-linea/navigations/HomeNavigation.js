import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import GameScreen from '../Screens/GameScreen'
import RankingScreen from "../Screens/RankingScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import DetailsScreen from "../Screens/DetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import GameOverScreen from "../Screens/GameOverScreen";
import LobbyScreen from '../Screens/LobbyScreen'
import { NavigationContainer } from "@react-navigation/native";
import SettingsScreen from "../Screens/SettingsScreen";
import GameScreenn from '../Screens/GameScreenn'


const RankingNestedNavigation =  () =>{
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>
            <Stack.Screen 
                    name='ranking'
                    component={RankingScreen}
                    options={{ headerShown: false }}
        />
            <Stack.Screen name = 'DetailsScreen'
                      component={DetailsScreen}
                      options={{headerShown: false}}
        />
                     
        </Stack.Navigator>
        
    )
}

const HomeNestedNavigation = () =>{
   const Stack = createStackNavigator()
    return(
        <Stack.Navigator>              
            <Stack.Screen 
            
                      name='Home'
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
                      name='LobbyScreen'
                     component={LobbyScreen}
                     options={{ headerShown: false }}
         />
         </Stack.Navigator>
     )
 }

const HomeNavigation = () => {
    const BottomTab = createBottomTabNavigator()

    return (
        <NavigationContainer>
    
    <BottomTab.Navigator screenOptions={({ route }) => {
            return {
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    if (route.name === 'HomeScreen') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'GameScreen') {
                        iconName = focused ? 'game-controller' : 'game-controller-outline'
                    } else if (route.name === 'ProfileScreen') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline'
                    } else if (route.name === 'RankingScreen') {
                        iconName = focused ? 'star' : 'star-outline'
                    } else if (route.name === 'SettingsScreen') {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            }
        }}>
            <BottomTab.Screen name='HomeScreen' component={HomeNestedNavigation} />
            <BottomTab.Screen name='RankingScreen' component={RankingNestedNavigation} />
            <BottomTab.Screen name='ProfileScreen' component={ProfileScreen} />
            <BottomTab.Screen name='SettingsScreen' component={SettingsScreen} />
        </BottomTab.Navigator>

        </NavigationContainer>  

    )
}

export default HomeNavigation
