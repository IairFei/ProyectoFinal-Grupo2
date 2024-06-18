import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import GameScreen from '../Screens/GameScreen'
// import RegisterLoginScreen from "../Screens/RegisterLoginScreen";
import RankingScreen from "../Screens/RankingScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const HomeNavigation = () => {
    const BottomTab = createBottomTabNavigator()

    return (
        <BottomTab.Navigator screenOptions={({ route }) => {
            return {
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    if (route.name === 'HomeScreen') {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (route.name === 'GameScreen') {
                        iconName = focused ? 'game-controller' : 'game-controller-outline'
                    } else if (route.name === 'ProfileScreeen') {
                        iconName = focused ? 'person-circle' : 'person-circle-outline'
                    } else if (route.name === 'RankingScreen') {
                        iconName = focused ? 'star' : 'star-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />
                }
            }
        }}>
            <BottomTab.Screen name='HomeScreen' component={HomeScreen} />
            <BottomTab.Screen name='GameScreen' component={GameScreen} />
            <BottomTab.Screen name='RankingScreen' component={RankingScreen} />
            <BottomTab.Screen name='ProfileScreeen' component={ProfileScreen} />
        </BottomTab.Navigator>
    )
}

export default HomeNavigation
