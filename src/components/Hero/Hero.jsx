import { ChevronRight, Sparkles } from 'lucide-react';

function Hero({ onExploreClick }) {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Join 10,000+ community members</span>
        </div>
        
        <h1 className="hero-main-title">
          Connecting <span className="highlight">Communities</span>
          <br /> Through Food
        </h1>
        
        <p className="hero-description">
          Share your surplus, reduce waste, and help your neighbors today.
          Together, we're building a sustainable future, one meal at a time.
        </p>
        
        <div className="hero-actions">
          <button onClick={onExploreClick} className="btn btn-gradient hero-cta-button">
            Start Exploring
            <ChevronRight size={20} />
          </button>
          <button className="btn btn-outline-hero">
            Watch Demo
          </button>
        </div>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">1,250+</span>
            <span className="hero-stat-text">kg Food Saved</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">3,000+</span>
            <span className="hero-stat-text">Meals Provided</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">15+</span>
            <span className="hero-stat-text">Active Cities</span>
          </div>
        </div>
      </div>
      
      <div className="hero-image-section">
        <div className="hero-image-card">
          <div className="hero-image-placeholder">
            <span>🍎</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;