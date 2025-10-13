import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';
import peopleImg from '../../assets/people.png';
import googleLogo from '../../assets/google-logo.svg';
import facebookLogo from '../../assets/facebook-logo.svg';
import instagramLogo from '../../assets/instagram-logo.svg';
import microsoftLogo from '../../assets/microsoft-logo.svg';


function AuthModal({ isOpen, onClose, initialView }) {
  const [view, setView] = useState(initialView);
  const { login, signup } = useAuth();
  
  // ИЗМЕНЕНИЕ: Добавляем состояние для отслеживания выбранной роли
  const [selectedRole, setSelectedRole] = useState('organization');

  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setSelectedRole('organization'); // Сбрасываем роль при каждом открытии
    }
  }, [isOpen, initialView]);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Для фейкового логина мы не знаем роль заранее,
    // поэтому по умолчанию логинимся как организация.
    login('fake@email.com', 'fakepassword', 'organization');
    onClose();
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // ИЗМЕНЕНИЕ: Передаем выбранную роль в функцию signup
    signup('Fake Name', 'fake@email.com', 'fakepassword', selectedRole);
    onClose();
  };
  
  const handleShowSignup = (e) => { e.preventDefault(); setView('signup'); };
  const handleShowLogin = (e) => { e.preventDefault(); setView('login'); };

  return (
    <CSSTransition in={isOpen} timeout={300} unmountOnExit nodeRef={overlayRef} classNames="modal-overlay">
      <div className="modal-overlay" ref={overlayRef} onClick={onClose}>
        <CSSTransition in={isOpen} timeout={300} unmountOnExit nodeRef={contentRef} classNames="modal-content">
          <div className="modal-content" ref={contentRef} onClick={(e) => e.stopPropagation()}>
            {/* ... image panel ... */}
            <div className="modal-form-panel">
              <button onClick={onClose} /* ... */ ></button>
              
              {/* ... Форма логина без изменений ... */}
              
              <div className={view === 'signup' ? '' : 'hidden'}>
                <h2 className="form-title">Create an <span className="highlight">account</span></h2>
                <form onSubmit={handleSignupSubmit}>
                    <fieldset className="form-fieldset">
                        <legend className="form-legend">Who are you?</legend>
                        <div className="user-type-selector">
                            {/* ИЗМЕНЕНИЕ: Добавляем checked и onChange для управления состоянием */}
                            <input type="radio" id="user-type-organization" name="user_type" value="organization" 
                                   checked={selectedRole === 'organization'} 
                                   onChange={() => setSelectedRole('organization')} />
                            <label htmlFor="user-type-organization" className="user-type-label">
                                <span className="user-type-icon">🏪</span><span>I'm an Organization</span>
                            </label>

                            <input type="radio" id="user-type-volunteer" name="user_type" value="volunteer" 
                                   checked={selectedRole === 'volunteer'} 
                                   onChange={() => setSelectedRole('volunteer')} />
                            <label htmlFor="user-type-volunteer" className="user-type-label">
                                <span className="user-type-icon">🙋‍♂️</span><span>I'm a Volunteer</span>
                            </label>
                        </div>
                    </fieldset>
                    {/* ... остальные поля формы ... */}
                    <button type="submit" className="btn btn-form-submit">Sign Up</button>
                    {/* ... */}
                </form>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

export default AuthModal;