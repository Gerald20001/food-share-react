import React, { createContext, useState, useContext } from 'react';
import { useToast } from './ToastContext';
import { users as mockUsers } from '../data/mockData'; // Импортируем моковые данные

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { addToast } = useToast();

  const login = async (email, password, role = 'organization') => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // При логине подтягиваем полные данные из mockData, чтобы профиль был полным
    const userId = role === 'organization' ? '1' : '101';
    const baseUser = mockUsers[userId];

    const fakeUser = {
      ...baseUser,
      id: parseInt(userId),
      email: email,
      role: role
    };
    setUser(fakeUser);
    addToast(`Добро пожаловать, ${fakeUser.name}!`);
    return fakeUser; 
  };

  const logout = () => {
    setUser(null);
    addToast('Вы вышли из системы.', 'error');
  };

  const signup = async (name, email, password, role) => {
    // После регистрации вызываем login, который подтянет все данные
    return await login(email, password, role);
  };
  
  const updateUser = async (updatedData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Обновляем "живое" состояние пользователя в контексте
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    
    // ВАЖНО: Также обновляем наши "моковые" данные, чтобы ProfilePage видел изменения
    // при просмотре другими пользователями (в будущем это будет делать бэкэнд).
    if (mockUsers[user.id]) {
      mockUsers[user.id] = { ...mockUsers[user.id], ...updatedData };
    }

    addToast('Профиль успешно обновлен!');
    return updatedUser;
  };
  
  const value = {
    user,
    login,
    logout,
    signup,
    updateUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}