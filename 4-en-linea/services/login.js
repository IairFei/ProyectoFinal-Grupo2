import AsyncStorage from "./AsyncStorage";

const BASE_URL = 'https://71cf-190-19-190-107.ngrok-free.app/api/auth/';

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
