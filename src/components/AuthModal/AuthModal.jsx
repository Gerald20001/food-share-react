import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner/Spinner';
import './AuthModal.css';
import peopleImg from '../../assets/people.png';
import googleLogo from '../../assets/google-logo.svg';
import facebookLogo from '../../assets/facebook-logo.svg';
import instagramLogo from '../../assets/instagram-logo.svg';
import microsoftLogo from '../../assets/microsoft-logo.svg';

function AuthModal({ isOpen, onClose, initialView }) {
  const [view, setView] = useState(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('organization');
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setSelectedRole('organization');
    }
  }, [isOpen, initialView]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const user = await login('fake@email.com', 'fakepassword', 'organization');
    setIsLoading(false);
    onClose();
    if (user.role === 'organization') {
      navigate('/dashboard');
    } else {
      navigate('/map');
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const user = await signup('Fake Name', 'fake@email.com', 'fakepassword', selectedRole);
    setIsLoading(false);
    onClose();
    if (user.role === 'organization') {
      navigate('/dashboard');
    } else {
      navigate('/map');
    }
  };
  
  const handleShowSignup = (e) => { e.preventDefault(); setView('signup'); };
  const handleShowLogin = (e) => { e.preventDefault(); setView('login'); };

  return (
    <CSSTransition in={isOpen} timeout={300} unmountOnExit nodeRef={overlayRef} classNames="modal-overlay">
      <div className="modal-overlay" ref={overlayRef} onClick={onClose}>
        <CSSTransition in={isOpen} timeout={300} unmountOnExit nodeRef={contentRef} classNames="modal-content">
          <div className="modal-content" ref={contentRef} onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-panel">
              <img src={peopleImg} alt="Illustration of people sharing food" className="modal-image" />
            </div>
            <div className="modal-form-panel">
              <button onClick={onClose} disabled={isLoading} className="close-modal-btn" aria-label="Close modal">
                <svg className="icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              
              <div className={view === 'login' ? '' : 'hidden'}>
                <h2 className="form-title">Welcome back to <span className="highlight">FoodShare,</span></h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="form-field"><label htmlFor="email-login">Email</label><input type="email" id="email-login" name="email" required /></div>
                    <div className="form-field"><label htmlFor="password-login">Password</label><input type="password" id="password-login" name="password" required /></div>
                    <div className="divider">OR Continue with</div>
                    <div className="social-login-grid">
                        <a href="#" className="btn-social" aria-label="Continue with Google"><img src={googleLogo} alt="Google" /></a>
                        <a href="#" className="btn-social" aria-label="Continue with Facebook"><img src={facebookLogo} alt="Facebook" /></a>
                        <a href="#" className="btn-social" aria-label="Continue with Instagram"><img src={instagramLogo} alt="Instagram" /></a>
                        <a href="#" className="btn-social" aria-label="Continue with Microsoft"><img src={microsoftLogo} alt="Microsoft" /></a>
                    </div>
                    <button type="submit" className="btn btn-form-submit" disabled={isLoading}>
                      {isLoading ? <Spinner /> : 'Login'}
                    </button>
                    <p className="form-switch-text">Don't have an account? <a href="#" onClick={handleShowSignup} className="form-switch-link">Sign up here</a></p>
                </form>
              </div>
              
              <div className={view === 'signup' ? '' : 'hidden'}>
                <h2 className="form-title">Create an <span className="highlight">account</span></h2>
                <form onSubmit={handleSignupSubmit}>
                    <fieldset className="form-fieldset">
                        <legend className="form-legend">Who are you?</legend>
                        <div className="user-type-selector">
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
                    <div className="form-field"><label htmlFor="fullname-signup">Your Name / Organization Name</label><input type="text" id="fullname-signup" name="fullname" required /></div>
                    <div className="form-field"><label htmlFor="email-signup">Email</label><input type="email" id="email-signup" name="email" required /></div>
                    <div className="form-field"><label htmlFor="password-signup">Password</label><input type="password" id="password-signup" name="password" required /></div>
                    <div className="divider">OR Continue with</div>
                    <div className="social-login-grid">
                        <a href="#" className="btn-social" aria-label="Continue with Google"><img src={googleLogo} alt="Google" /></a>
                        <a href="#" className="btn-social" aria-label="Continue with Facebook"><img src={facebookLogo} alt="Facebook" /></a>
                        <a href="#" className="btn-social" aria-label="Continue with Instagram"><img src={instagramLogo} alt="Instagram" /></a>
                        <a href="#" className="btn-social" aria-label="Continue with Microsoft"><img src={microsoftLogo} alt="Microsoft" /></a>
                    </div>
                    <button type="submit" className="btn btn-form-submit" disabled={isLoading}>
                      {isLoading ? <Spinner /> : 'Sign Up'}
                    </button>
                    <p className="form-switch-text">Already have an account? <a href="#" onClick={handleShowLogin} className="form-switch-link">Login here</a></p>
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