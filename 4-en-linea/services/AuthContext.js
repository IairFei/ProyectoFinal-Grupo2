import React, { createContext, useState, useEffect } from 'react';
import loginService from './login';
import AsyncStorage from './AsyncStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const data = await AsyncStorage.getData('authData');
      if (data) {
        setAuthData(data);
      }
    };
    loadAuthData();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginService.login(email, password);
      setAuthData(data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.clearAll();
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
