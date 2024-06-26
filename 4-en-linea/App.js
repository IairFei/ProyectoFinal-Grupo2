import { useState, useEffect } from "react";
import { AuthContext, AuthProvider } from "./services/AuthContext";
import RegisterLoginScreen from "./Screens/RegisterLoginScreen";
import HomeNavigation from "./navigations/HomeNavigation";
import { defaultAuthData} from "./services/AutchContext";
import AsyncStorage from "./services/AsyncStorage";


export default function App() {
  const [authData, setAuthData] = useState(defaultAuthData);

  useEffect(() => {
    AsyncStorage.getData("authData").then((data) => {
      console.log("Encontro algo???", data);
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
    <AuthContext.Provider value={{authData,setAuthData}}>
      {authData ? <HomeNavigation /> : <RegisterLoginScreen />}
    </AuthContext.Provider>
  );
}
