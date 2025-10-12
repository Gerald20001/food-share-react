import { useState } from 'react';
import { Link } from 'react-router-dom';

// 1. Импортируем наш кастомный хук для доступа к контексту аутентификации
import { useAuth } from '../../context/AuthContext';

// 2. Импортируем стили и логотип
import './Header.css';
import logoImg from '../../assets/logo.png';

// 3. Компонент теперь принимает props для модальных окон и темы
function Header({ onLoginClick, onSignupClick, isDarkMode, toggleTheme }) {
  // Локальное состояние для мобильного меню
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // 4. Получаем данные о пользователе и функции из AuthContext
  const { isAuthenticated, user, logout } = useAuth();

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
          <Link to="/map">Find Food</Link>
          <Link to="/dashboard">Share Food</Link>
          <a href="/#blog-highlights">Blog</a>

          {/* 5. Условный рендеринг: показываем разный UI в зависимости от того, залогинен ли пользователь */}
          {isAuthenticated ? (
            // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ЗАЛОГИНЕН:
            <div className="profile-menu">
              <Link to="/dashboard" aria-label="Dashboard">
                <img src={user.avatarUrl} alt="User Avatar" className="profile-avatar" />
              </Link>
              <button onClick={logout} className="btn btn-secondary">Log Out</button>
            </div>
          ) : (
            // ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ ЗАЛОГИНЕН:
            <>
              <button onClick={onLoginClick} className="btn btn-secondary">Log In</button>
              <button onClick={onSignupClick} className="btn btn-primary">Sign Up</button>
            </>
          )}

          {/* 6. Кнопка переключения темы */}
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {/* Иконка солнца (показывается, если НЕ темная тема) */}
            <svg className={`icon ${isDarkMode ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            {/* Иконка луны (показывается, если темная тема) */}
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