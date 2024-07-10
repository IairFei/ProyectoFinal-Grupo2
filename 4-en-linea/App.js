import { useState, useEffect } from "react";
import AsyncStorage from "./services/AsyncStorage";
import AuthContextGlobal, { defaultAuthData } from './services/AutchContext';
import RegisterLoginScreen from "./Screens/RegisterLoginScreen";
import HomeNavigation from "./navigations/HomeNavigation";
import { Text } from "react-native";

export default function App() {
  const [authData, setAuthData] = useState(defaultAuthData);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    AsyncStorage.getData("authData").then((data) => {
      console.log("Encontro algo???", data);
      if (data) {
        setAuthData(data);
        setLoading(false);
      } else {
        setLoading(false); 
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (authData) {
        console.log("Usuario logueado");
        console.log("AuthData desde setTimeOut: ", authData);
      } else {
        console.log("Usuario deslogueado");
        console.log("Borrando data");
        AsyncStorage.clearAll();
      }
    });
  }, [authData]);

  
  if (loading) {
    return (
      <Text>Cargando...</Text>
    )
  }

  return (
    <AuthContextGlobal.Provider value={{ authData, setAuthData }}>
      {authData ? <HomeNavigation /> : <RegisterLoginScreen />}
    </AuthContextGlobal.Provider>
  );
}
