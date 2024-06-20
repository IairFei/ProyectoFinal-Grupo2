import AsyncStorage from "./AsyncStorage";

const login = (email, password) => {
    return new Promise((resolve, reject) => {
      //TODO: Implementar la llamada al API
      const shouldLogin = email.toString().toLowerCase() === 'admin@admin.com' && password === 'admin'
      if (shouldLogin) {
        const authData = {
          access_token: '123456789',
          expires_in: 3600,
          profile: {
            email: 'admin@admin.com',
            fullName: "Admin",
            role: 'admin'
          }
        }
        AsyncStorage.storeData('authData', authData);
        return resolve(authData);
      } else {
        return reject('Usuario o contraseña incorrectos');
      }
    });
}

const register = (email, password, fullName) => {
  return new Promise((resolve, reject) => {
    const authData = {
      access_token: '123456789',
      expires_in: 3600,
      profile: {
        email,
        fullName,
        role: 'user'
      }
    };
    AsyncStorage.storeData('authData', authData);
    return resolve(authData);
  });
};

const logout = async () => {
  await AsyncStorage.clearAll();
}

export default {
  login,
  logout,
  register,
}
