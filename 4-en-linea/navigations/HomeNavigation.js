import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import GameScreen from '../Screens/GameScreen'
import RegisterLoginScreen from "../Screens/RegisterLoginScreen";
import RankingScreen from "../Screens/RankingScreen";
import { Ionicons } from "@expo/vector-icons";

const HomeNavigation = () =>{
    const BottonTab = createBottomTabNavigator()
   

    return(
        <BottonTab.Navigator screenOptions={({ route })=>{
            return{
                tabBarIcon: ({ focused, color, size })=>{
                    let iconName
                    if(route.name === 'HomeScreen'){
                        iconName = focused? 'home' : 'home-outline'
                    }else if(route.name === 'GameScreen'){
                        iconName = focused ? 'game-controller' : 'game-controller-outline' 
                    }else if(route.name === 'Perfil'){
                        iconName = focused ? 'person-circle' : 'person-circle-outline'
                    }else if(route.name === 'Ranking'){
                        iconName = focused ? 'star' : 'star-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                }                                          
            }
        }}>
            <BottonTab.Screen  name = 'HomeScreen' component={HomeScreen} />
            <BottonTab.Screen name = 'GameScreen' component={GameScreen}/>
            <BottonTab.Screen name = 'Ranking' component={RankingScreen}/>
            <BottonTab.Screen name = 'Perfil' component={RegisterLoginScreen}/>
        </BottonTab.Navigator>
    )

}

export default HomeNavigation