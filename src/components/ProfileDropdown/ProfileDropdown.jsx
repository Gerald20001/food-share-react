import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

function ProfileDropdown({ user, onLogout }) {
  // Определяем правильный путь к дашборду в зависимости от роли
  const dashboardPath = user.role === 'organization' ? '/dashboard' : '/my-claims';
  const dashboardLabel = user.role === 'organization' ? 'Мой дашборд' : 'Мои заказы';

  return (
    <div className="profile-dropdown">
      <div className="dropdown-user-info">
        <span className="user-name">{user.name}</span>
        <span className="user-role">{user.role}</span>
      </div>
      <Link to={dashboardPath}>{dashboardLabel}</Link>
      <Link to={`/profile/${user.id}`}>Профиль</Link>
      <button onClick={onLogout}>Выйти</button>
    </div>
  );
}

export default ProfileDropdown;