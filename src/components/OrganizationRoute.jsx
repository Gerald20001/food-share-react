// src/components/OrganizationRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading/Loading';

function OrganizationRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  // Если мы еще не знаем, залогинен ли пользователь (например, при перезагрузке),
  // можно показать заглушку. Для простоты пока оставим.
  // if (user === undefined) return <Loading />;

  // Если не залогинен, отправляем на главную
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Если залогинен, но роль НЕ 'organization', отправляем на карту
  if (user.role !== 'organization') {
    return <Navigate to="/map" replace />;
  }

  // Если все проверки пройдены, показываем запрошенную страницу
  return children;
}

export default OrganizationRoute;