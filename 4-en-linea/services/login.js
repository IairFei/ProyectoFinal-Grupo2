import AsyncStorage from "./AsyncStorage";
import bcrypt from "bcrypt";


const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // TODO: Implementar la llamada al API
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

const register = async (email, password, fullName) => {
  try {
    const hashedPassword = await hashPassword(password);
    const authData = {
      access_token: '123456789',
      expires_in: 3600,
      profile: {
        email,
        fullName,
        role: 'user'
      },
      hashedPassword
    };
    await AsyncStorage.storeData('authData', authData);
    return Promise.resolve(authData);
  } catch (error) {
    return Promise.reject('Error registrando el usuario');
  }
};

const logout = async () => {
  await AsyncStorage.clearAll();
}

export default {
  login,
  logout,
  register,
}
