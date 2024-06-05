import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import GameScreen from '../Screens/GameScreen'
import RegisterLoginScreen from "../Screens/RegisterLoginScreen";
import { Ionicons } from "@expo/vector-icons";

const HomeNavigation = () =>{
    const BottonTab = createBottomTabNavigator()
   

    return(
        <BottonTab.Navigator screenOptions={({ route })=>{
            return{
                tabBarIcon: ({ focused, color, size })=>{
                    let iconName
                    if(route.name === 'home'){
                        iconName = focused? 'home' : 'home-outline'
                    }else if(route.name === 'jugar'){
                        iconName = focused ? 'game-controller' : 'game-controller-outline' 
                    }else if(route.name === 'salir'){
                        iconName = focused ? 'power' : 'power-off'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                }
            }
        }}>
            <BottonTab.Screen  name = 'home' component={HomeScreen} />
            <BottonTab.Screen name = 'jugar' component={GameScreen}/>
            <BottonTab.Screen name = 'Salir' component={RegisterLoginScreen}/>
        </BottonTab.Navigator>
    )

}

export default HomeNavigation