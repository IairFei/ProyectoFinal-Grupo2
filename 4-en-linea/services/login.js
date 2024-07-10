import AsyncStorage from "./AsyncStorage";

import BASE_URL from '../services/conecction.js'

const login = (email, password) => {
  return new Promise((resolve, reject) => {

    fetch(`${BASE_URL}/api/auth/login/`, {
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
      console.log("Auth data desde service login storedata: ", typeof authData, authData)

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
    fetch(`${BASE_URL}/api/auth/register/`, {
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
