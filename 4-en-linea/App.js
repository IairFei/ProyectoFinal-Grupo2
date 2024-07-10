// import { useState, useEffect } from "react";
// //import { AuthContext, AuthProvider } from "./services/AuthContext";
// import RegisterLoginScreen from "./Screens/RegisterLoginScreen";
// import HomeNavigation from "./navigations/HomeNavigation";
// import AsyncStorage from "./services/AsyncStorage";
// import AuthContextGlobal, {defaultAuthData} from './services/AutchContext'


// export default function App() {
//   const [authData, setAuthData] = useState(defaultAuthData);

//   useEffect(() => {
//     AsyncStorage.getData("authData").then((data) => {
//       console.log("Encontro algo???");
//       if (data) {
//         setAuthData(data);
//         console.log("Data desde app.js: ", data)
//       }
//     });
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       if (authData) {
//         console.log("Usuario logueado");
//       } else {
//         console.log("Usuario deslogueado");
//         console.log("Borrando data")
//         AsyncStorage.clearAll();
//       }
//     });
//   }, [authData]);

//   return (
//     <AuthContextGlobal.Provider value={{authData,setAuthData}}>
//       {authData ? <HomeNavigation /> : <RegisterLoginScreen />}
//     </AuthContextGlobal.Provider>
//   );
// }

// import { useState, useEffect } from "react";
// import AsyncStorage from "./services/AsyncStorage";
// import AuthContextGlobal, { defaultAuthData } from './services/AutchContext';
// import RegisterLoginScreen from "./Screens/RegisterLoginScreen";
// import HomeNavigation from "./navigations/HomeNavigation";

// export default function App() {
//   const [authData, setAuthData] = useState(defaultAuthData);

//   useEffect(() => {
//     // Recuperar datos de autenticación al iniciar la aplicación
//     AsyncStorage.getData("authData").then((data) => {
//       console.log("Encontro algo???", data);
//       if (data) {
//         setAuthData(data);
//         console.log("Data desde app.js: ", data);
//         console.log("AuthData desde app.js: ", authData);
//       }
//     });
//   }, []);

//   // useEffect(() => {
//   //   // Manejar el estado de autenticación
//   //   if (authData) {
//   //     console.log("Usuario logueado");
//   //   } else {
//   //     console.log("Usuario deslogueado");
//   //     console.log("Borrando data");
//   //     //AsyncStorage.clearAll(); // Asegurarse de que esta acción no se dispare incorrectamente
//   //   }
//   // }, [authData]);

//   useEffect(() => {
//     setTimeout(() => {
//       if (authData) {
//         console.log("Usuario logueado");
//         console.log("AuthData desde setTimeOut: ", authData)
//       } else {
//         console.log("Usuario deslogueado");
//         console.log("Borrando data")
//         AsyncStorage.clearAll();
//       }
//     });
//   }, [authData]);

//   return (
//     <AuthContextGlobal.Provider value={{ authData, setAuthData }}>
//       {authData ? <HomeNavigation /> : <RegisterLoginScreen />}
//     </AuthContextGlobal.Provider>
//   );
// }

import { useState, useEffect } from "react";
import AsyncStorage from "./services/AsyncStorage";
import AuthContextGlobal, { defaultAuthData } from './services/AutchContext';
import RegisterLoginScreen from "./Screens/RegisterLoginScreen";
import HomeNavigation from "./navigations/HomeNavigation";
import { Text } from "react-native";

export default function App() {
  const [authData, setAuthData] = useState(defaultAuthData);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga inicial

  useEffect(() => {
    // Recuperar datos de autenticación al iniciar la aplicación
    AsyncStorage.getData("authData").then((data) => {
      console.log("Encontro algo???", data);
      if (data) {
        setAuthData(data);
        setLoading(false); // Finaliza la carga inicial cuando se recuperan los datos
      } else {
        setLoading(false); // Finaliza la carga inicial si no hay datos disponibles
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

  // Muestra una pantalla de carga mientras se están recuperando los datos
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
