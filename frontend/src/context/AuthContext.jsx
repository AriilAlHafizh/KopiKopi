// Di dalam file AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api'; // Pastikan path ini benar

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi checkAuthStatus (tidak berubah)
  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/me');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // --- PERUBAHAN UTAMA DI SINI ---
  // Jadikan fungsi login bertanggung jawab untuk navigasi
  const login = (userData, navigate) => {
    // 1. Set state aplikasi terlebih dahulu
    setUser(userData);
    setIsAuthenticated(true);

    // 2. Lakukan navigasi SETELAH state diperbarui
    if (userData.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (userData.role === 'seller') {
      navigate('/seller/dashboard');
    } else {
      navigate('/');
    }
  };
  
  // Fungsi logout (tidak berubah)
  const logout = async () => {
    try {
      await api.delete('/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};