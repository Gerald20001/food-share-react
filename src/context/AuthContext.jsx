import React, { createContext, useState, useContext } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { addToast } = useToast();
  // УБИРАЕМ useNavigate ОТСЮДА

  const login = (email, password, role = 'organization') => {
    const fakeUser = {
      id: role === 'organization' ? 1 : 101,
      name: role === 'organization' ? "Пекарня 'Добро'" : "Иван Волонтер",
      email: email,
      avatarUrl: role === 'organization' ? 'https://i.pravatar.cc/150?u=org' : 'https://i.pravatar.cc/150?u=volunteer',
      role: role
    };
    setUser(fakeUser);
    addToast(`Добро пожаловать, ${fakeUser.name}!`);
    // УБИРАЕМ navigate(...) ОТСЮДА
  };

  const logout = () => {
    setUser(null);
    addToast('Вы вышли из системы.', 'error');
    // УБИРАЕМ navigate(...) ОТСЮДА
  };

  const signup = (name, email, password, role) => {
    login(email, password, role);
  };
  
  const value = { user, login, logout, signup, isAuthenticated: !!user };

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