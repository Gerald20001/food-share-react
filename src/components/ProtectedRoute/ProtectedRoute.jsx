import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Этот компонент принимает `children` - это тот компонент,
// который мы хотим защитить (например, <DashboardPage />).
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Если пользователь не залогинен, мы используем компонент Navigate
    // для декларативного редиректа на главную страницу.
    return <Navigate to="/" replace />;
  }

  // Если пользователь залогинен, мы просто рендерим тот компонент,
  // который нам передали.
  return children;
}

export default ProtectedRoute;