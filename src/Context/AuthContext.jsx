// src/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../Components/axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await apiClient.post('https://smart-shipment-system.vercel.app/api/v1/users/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      return res.data;
    } catch (error) {
      throw new Error('Login failed. Please try again.');
    }
  };

  const value = {
    token,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
