import './Footer.css';
import logoImg from '../../assets/logo.png';
import twitterLogo from '../../assets/twitter-logo.svg';
import linkedinLogo from '../../assets/linkedin-logo.svg';
import instagramLogo from '../../assets/instagram-logo.svg';

function Footer() {
  return (
    <footer className="site-footer-main">
      <div className="footer-grid">
        <div className="footer-about">
          <a href="#" className="logo" aria-label="FoodShare Home">
            <img src={logoImg} alt="FoodShare Logo" className="logo-img" />
            <span className="logo-text">FoodShare</span>
          </a>
          <p>Connecting communities by redirecting surplus food to those in need, reducing waste and fighting hunger one share at a time.</p>
        </div>
        <div className="footer-column">
          <h4>Platform</h4>
          <a href="#how-it-works">How It Works</a>
          <a href="#">For Organizations</a>
          <a href="#">For Volunteers</a>
          <a href="#blog-highlights">Blog</a>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Partners</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-bottom-bar">
        <span>© 2025 FoodShare Project. All rights reserved.</span>
        <div className="social-links">
          <a href="#" aria-label="Twitter"><img src={twitterLogo} alt="Twitter" style={{ height: '20px' }} /></a>
          <a href="#" aria-label="LinkedIn"><img src={linkedinLogo} alt="LinkedIn" style={{ height: '20px' }} /></a>
          <a href="#" aria-label="Instagram"><img src={instagramLogo} alt="Instagram" style={{ height: '20px' }} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;