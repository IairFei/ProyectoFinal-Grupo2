import  { useContext, useState } from 'react';
import  {AuthContext,AuthProvider } from './services/AuthContext'; 
import RegisterLoginScreen from './Screens/RegisterLoginScreen';
import HomeNavigation from "./navigations/HomeNavigation";
import { defaultAuthData } from './services/AutchContext';



export default function App() {
  const [authData, setAuthData] = useState(defaultAuthData)

  return (
    <AuthContext.Provider value={{authData, setAuthData}}>
      {

        authData?
        <HomeNavigation/>
        :
        <RegisterLoginScreen/>

      }
    </AuthContext.Provider>
  );
}
