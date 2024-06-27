import { useState, useEffect } from "react";
import { AuthContext, AuthProvider } from "./services/AuthContext";
import RegisterLoginScreen from "./Screens/RegisterLoginScreen";
import HomeNavigation from "./navigations/HomeNavigation";
//import { defaultAuthData} from "./services/AutchContext";
import AsyncStorage from "./services/AsyncStorage";
import AuthContextGlobal, {defaultAuthData} from './services/AutchContext'


export default function App() {
  const [authData, setAuthData] = useState(defaultAuthData);

  useEffect(() => {
    AsyncStorage.getData("authData").then((data) => {
      console.log("Encontro algo???");
      if (data) {
        setAuthData(data);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (authData) {
        console.log("Usuario logueado");
        AsyncStorage.storeData("authData", authData);
      } else {
        console.log("Usuario deslogueado");
        AsyncStorage.clearAll();
      }
    });
  }, [authData]);

  return (
    <AuthContextGlobal.Provider value={{authData,setAuthData}}>
      {authData ? <HomeNavigation /> : <RegisterLoginScreen />}
    </AuthContextGlobal.Provider>
  );
}
