import React, { createContext, useState, useContext } from 'react';
import { useToast } from './ToastContext'; // 1. Импортируем хук для уведомлений

// Создаем сам контекст
const AuthContext = createContext(null);

// Создаем "Провайдер" - компонент, который будет хранить состояние и логику
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { addToast } = useToast(); // 2. Получаем функцию для добавления уведомлений

  // --- Функции-заглушки, которые мы потом заменим на реальные запросы к API ---

  const login = (email, password) => {
    console.log("Попытка входа с:", email, password);
    // В БУДУЩЕМ: здесь будет fetch-запрос к вашему API

    // А ПОКА: просто создаем фейкового пользователя
    const fakeUser = {
      id: 1,
      name: "John Doe",
      email: email,
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
    };
    setUser(fakeUser);
    
    // 3. Используем уведомление вместо console.log
    addToast(`Добро пожаловать, ${fakeUser.name}!`);
  };

  const logout = () => {
    console.log("Выход из системы");
    // В БУДУЩЕМ: здесь будет fetch-запрос к /api/logout
    setUser(null);
    
    // 4. Используем уведомление с типом 'error' (или любым другим)
    addToast('Вы вышли из системы.', 'error');
  };

  const signup = (name, email, password) => {
    console.log("Регистрация:", name, email, password);
    // После успешной регистрации сразу логиним, что вызовет уведомление о входе
    login(email, password);
  };
  
  // --- КОНЕЦ ФУНКЦИЙ-ЗАГЛУШЕК ---

  // Передаем состояние и функции всем дочерним компонентам
  const value = {
    user,
    login,
    logout,
    signup,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Создаем кастомный хук для удобного доступа к контексту
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}