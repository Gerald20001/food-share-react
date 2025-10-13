import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';
import logoImg from '../../assets/logo.png';

function Header({ onLoginClick, onSignupClick, isDarkMode, toggleTheme }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Вызываем функцию из контекста
    navigate('/'); // Выполняем перенаправление на главную
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link to="/" className="logo" aria-label="FoodShare Home">
          <img src={logoImg} alt="FoodShare Logo" className="logo-img" />
          <span className="logo-text">FoodShare</span>
        </Link>

        <button className="hamburger-btn" onClick={toggleNav} aria-label="Toggle navigation menu" aria-expanded={isNavOpen}>
          <span></span><span></span><span></span>
        </button>

        <nav className={`main-nav ${isNavOpen ? 'nav-open' : ''}`} role="navigation">
          <NavLink to="/map" className={({ isActive }) => isActive ? 'active' : ''}>
            Find Food
          </NavLink>
          {/* Эта ссылка будет подсвечиваться, только если пользователь - организация */}
          {isAuthenticated && user?.role === 'organization' && (
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
              Share Food
            </NavLink>
          )}
          <a href="/#blog-highlights">Blog</a>

          {isAuthenticated ? (
            <div className="profile-menu">
              <Link to="/dashboard" aria-label="Dashboard">
                <img src={user.avatarUrl} alt="User Avatar" className="profile-avatar" />
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary">Log Out</button>
            </div>
          ) : (
            <>
              <button onClick={onLoginClick} className="btn btn-secondary">Log In</button>
              <button onClick={onSignupClick} className="btn btn-primary">Sign Up</button>
            </>
          )}

          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            <svg className={`icon ${isDarkMode ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg className={`icon ${isDarkMode ? '' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;