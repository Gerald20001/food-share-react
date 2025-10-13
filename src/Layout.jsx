import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import AuthModal from './components/AuthModal/AuthModal';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';

function Layout() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Состояние для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');

  // Состояние для темной темы
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  // Эффект для управления классом темы и сохранения в localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Эффект для "умного" перенаправления после логина
  useEffect(() => {
    // Срабатывает, когда isAuthenticated меняется с false на true
    if (isAuthenticated && user) {
      if (user.role === 'organization') {
        navigate('/dashboard', { replace: true });
      } else if (user.role === 'volunteer') {
        navigate('/map', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Функции-обработчики
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const handleOpenLoginModal = () => { setModalView('login'); setIsModalOpen(true); };
  const handleOpenSignupModal = () => { setModalView('signup'); setIsModalOpen(true); };
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Header 
        onLoginClick={handleOpenLoginModal}
        onSignupClick={handleOpenSignupModal}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main>
        <Suspense fallback={<Loading />}>
          <Outlet context={{ onSignupClick: handleOpenSignupModal, onLoginClick: handleOpenLoginModal }} />
        </Suspense>
      </main>

      <Footer />

      <AuthModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialView={modalView}
      />
    </>
  );
}

export default Layout;