import React, { useState, useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthModal from './components/AuthModal/AuthModal';
import Footer from './components/Footer/Footer';
import Loading from './components/Loading/Loading';

function Layout() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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