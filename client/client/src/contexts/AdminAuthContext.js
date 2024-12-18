import React, { createContext, useState, useEffect } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Проверяем, авторизован ли администратор при загрузке приложения
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  // Функция для обновления состояния авторизации администратора
  const updateAdminAuthStatus = (token) => {
    if (token) {
      localStorage.setItem('adminToken', token);
      setIsAdminAuthenticated(true);
    } else {
      localStorage.removeItem('adminToken');
      setIsAdminAuthenticated(false);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, updateAdminAuthStatus }}>
      {children}
    </AdminAuthContext.Provider>
  );
};