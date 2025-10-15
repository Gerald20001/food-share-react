import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Если не залогинен, отправляем на главную
    return <Navigate to="/" replace />;
  }

  // Если залогинен, показываем страницу
  return children;
}

export default ProtectedRoute;