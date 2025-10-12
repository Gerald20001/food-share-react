import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthModal from './components/AuthModal/AuthModal';
import Footer from './components/Footer/Footer';

function Layout() {
  // --- Состояние для модального окна ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');

  // --- Состояние для темной темы ---
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  // Эффект для управления классом темы и сохранения в localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // --- Функции-обработчики ---
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleOpenLoginModal = () => {
    setModalView('login');
    setIsModalOpen(true);
  };

  const handleOpenSignupModal = () => {
    setModalView('signup');
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header 
        onLoginClick={handleOpenLoginModal}
        onSignupClick={handleOpenSignupModal}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main className="main-content">
        {/*
          КЛЮЧЕВОЕ ИЗМЕНЕНИЕ:
          Мы передаем функции onSignupClick и onLoginClick через 'context'.
          Теперь любая страница (HomePage, MapPage и т.д.), которая рендерится 
          внутри Outlet, сможет получить к ним доступ.
        */}
        <Outlet context={{ onSignupClick: handleOpenSignupModal, onLoginClick: handleOpenLoginModal }} />
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