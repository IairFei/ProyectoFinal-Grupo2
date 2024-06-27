// import AsyncStorage from "./AsyncStorage";

// const login = (email, password) => {
//     return new Promise((resolve, reject) => {
//       //TODO: Implementar la llamada al API
//       const shouldLogin = email.toString().toLowerCase() === 'admin@admin.com' && password === 'admin'
//       if (shouldLogin) {
//         const authData = {
//           access_token: '123456789',
//           expires_in: 3600,
//           profile: {
//             email: 'admin@admin.com',
//             fullName: "Admin",
//             role: 'admin'
//           }
//         }
//         AsyncStorage.storeData('authData', authData);
//         return resolve(authData);
//       } else {
//         return reject('Usuario o contraseña incorrectos');
//       }
//     });
// }

// const register = (email, password, fullName) => {
//   return new Promise((resolve, reject) => {
//     const authData = {
//       access_token: '123456789',
//       expires_in: 3600,
//       profile: {
//         email,
//         fullName,
//         role: 'user'
//       }
//     };
//     AsyncStorage.storeData('authData', authData);
//     return resolve(authData);
//   });
// };

// const logout = async () => {
//   await AsyncStorage.clearAll();
// }

// export default {
//   login,
//   logout,
//   register,
// }

import AsyncStorage from "./AsyncStorage";

const BASE_URL = 'https://71cf-190-19-190-107.ngrok-free.app/api/auth/'; // Asegúrate de que esta URL apunte correctamente a tu backend

const login = (email, password) => {
  return new Promise((resolve, reject) => {

    fetch(`${BASE_URL}login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Usuario o contraseña incorrectos');
      }
    })
    .then(authData => {
      AsyncStorage.storeData('authData', authData);
      resolve(authData);
    })
    .catch(error => {
      reject(error.message);
    });
  });
};

const register = (email, password, name) => {
  console.log("En register1")
  console.log(email, password, name)
  
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Error al registrar usuario');
      }
    })
    .then(authData => {
      AsyncStorage.storeData('authData', authData);
      resolve(authData);
    })
    .catch(error => {
      reject(error.message);
    });
  });

};

const logout = async () => {
  await AsyncStorage.clearAll();
};

export default {
  login,
  logout,
  register,
};
