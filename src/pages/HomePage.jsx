import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard/FeatureCard';
import FaqItem from '../components/FaqItem/FaqItem';
import './HomePage.css';

import story1Img from '../assets/user5.png';
import story2Img from '../assets/user5.png';
import story3Img from '../assets/user5.png';
import user1Img from '../assets/user5.png';
import user2Img from '../assets/user5.png';
import user3Img from '../assets/user5.png';
import partner1Img from '../assets/user5.png';
import partner2Img from '../assets/user5.png';
import partner3Img from '../assets/user5.png';
import partner4Img from '../assets/user5.png';
import partner5Img from '../assets/user5.png';
import mapPlaceholderImg from '../assets/user5.png';
import blog1Img from '../assets/user5.png';
import blog2Img from '../assets/user5.png';
import blog3Img from '../assets/user5.png';

// Данные для секции FAQ, вынесены для чистоты кода
const faqData = [
  { id: 1, question: 'Is the food really free?', answer: 'Yes, absolutely. The core principle of FoodShare is that all food is shared freely. Organizations provide it as a donation to reduce waste, and volunteers pick it up at no cost.' },
  { id: 2, question: 'Is the food safe to eat?', answer: 'All organizations are encouraged to share only food that is safe for consumption. Each offer includes an expiry date, and our rating system helps maintain a high standard of quality and trust.' },
  { id: 3, question: 'Who can sign up as an organization?', answer: 'Any registered business or entity that handles food can join, including restaurants, cafes, bakeries, grocery stores, farms, and event caterers. We have a verification process to ensure all listed organizations are legitimate.' },
  { id: 4, question: 'How do I become a volunteer?', answer: 'Sign up as a volunteer through our platform, create a profile, and start browsing available food listings in your area. It’s quick, easy, and free!' },
  { id: 5, question: 'Can I donate money instead of food?', answer: 'While our platform focuses on food sharing, we partner with nonprofits that accept monetary donations to support our mission. Contact us to learn more!' }
];

function HomePage() {
  // Получаем функцию для открытия модалки из родительского Layout
  const { onSignupClick } = useOutletContext();
  
  // Локальное состояние для управления открытым/закрытым состоянием FAQ
  const [openFaqId, setOpenFaqId] = useState(null);

  const handleFaqToggle = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Connecting <span className="highlight">Communities</span><br /> Through Food</h1>
        <p className="hero-subtitle">Share your surplus, reduce waste, and help your neighbors today.</p>
        <a href="#how-it-works" className="btn btn-gradient cta-button">Start Exploring</a>
      </section>

      <section className="features-grid">
        <FeatureCard icon="🌍" title="Find Nearby" description="Instantly locate available food in your local area." />
        <FeatureCard icon="🤝" title="Share Surplus" description="Easily post what you have to share with others." />
        <FeatureCard icon="♻️" title="Reduce Waste" description="Contribute to a greener, more sustainable world." />
      </section>

      <section className="content-section mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="mission-text">
            "We believe that good food belongs in homes, not in landfills. Our mission is to build a bridge between surplus and scarcity, creating a sustainable cycle where every meal finds a purpose. We're not just fighting food waste — we're strengthening community bonds, one share at a time."
        </p>
      </section>

      <section className="content-section" id="how-it-works">
        <h2 className="section-title">A Simple Way to Make a Difference</h2>
        <p className="section-subtitle">Our platform makes it incredibly easy to connect those with surplus food to those in need, in just three simple steps.</p>
        <div className="steps-grid">
            <div className="step-card">
                <h3 className="step-title">Post Your Surplus</h3>
                <p className="step-description">Organizations can quickly post details about their available food, including type, quantity, and pickup times.</p>
            </div>
            <div className="step-card">
                <h3 className="step-title">Find & Claim</h3>
                <p className="step-description">Volunteers browse a real-time map, find food nearby, and claim it with a single click.</p>
            </div>
            <div className="step-card">
                <h3 className="step-title">Connect & Share</h3>
                <p className="step-description">Once a claim is approved, the volunteer picks up the food. It's that simple to reduce waste and help others.</p>
            </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Who is FoodShare for?</h2>
        <div className="user-types-grid">
          <div className="user-type-card">
            <div className="feature-icon">🏪</div>
            <h3>For Organizations</h3>
            <ul><li>Reduce disposal costs.</li><li>Enhance your brand's social responsibility.</li><li>Track your positive environmental impact.</li><li>Connect directly with local volunteers.</li></ul>
            <button onClick={onSignupClick} className="btn btn-secondary">Share Food</button>
          </div>
          <div className="user-type-card">
            <div className="feature-icon">🙋‍♂️</div>
            <h3>For Volunteers</h3>
            <ul><li>Find free, quality food nearby.</li><li>Support your community and neighbors.</li><li>Help reduce food waste in your city.</li><li>Discover local businesses and charities.</li></ul>
            <button onClick={onSignupClick} className="btn btn-primary">Find Food</button>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Success Stories</h2>
        <p className="section-subtitle">Discover how FoodShare is transforming lives and communities through the power of sharing.</p>
        <div className="testimonials-grid">
            <div className="testimonial-card"><img src={story1Img} alt="Local bakery sharing surplus" className="story-image" /><h3 className="story-title">A Bakery’s Journey to Zero Waste</h3><p className="testimonial-quote">"Since joining FoodShare, our bakery has donated over 500 loaves of bread, reducing waste and feeding families in need."</p><div className="testimonial-author"><img src={user1Img} alt="Sarah Johnson" className="author-image" /><div><p className="author-name">Sarah Johnson</p><p className="author-role">Bakery Owner, San Francisco</p></div></div></div>
            <div className="testimonial-card"><img src={story2Img} alt="Volunteer helping community" className="story-image" /><h3 className="story-title">Volunteering with Purpose</h3><p className="testimonial-quote">"As a volunteer, I’ve connected with local businesses and helped distribute fresh meals to those who need them most."</p><div className="testimonial-author"><img src={user2Img} alt="Michael Lee" className="author-image" /><div><p className="author-name">Michael Lee</p><p className="author-role">Volunteer, Chicago</p></div></div></div>
            <div className="testimonial-card"><img src={story3Img} alt="Nonprofit food distribution" className="story-image" /><h3 className="story-title">Empowering Nonprofits</h3><p className="testimonial-quote">"FoodShare’s platform has streamlined our food distribution, allowing us to focus on serving our community."</p><div className="testimonial-author"><img src={user3Img} alt="Emily Carter" className="author-image" /><div><p className="author-name">Emily Carter</p><p className="author-role">Nonprofit Coordinator, New York</p></div></div></div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Trusted By Our Partners</h2>
        <p className="section-subtitle">We’re proud to collaborate with organizations committed to reducing food waste and supporting communities.</p>
        <div className="partners-grid">
            <div className="partner-card"><img src={partner1Img} alt="Green Eats Co." className="partner-logo" /><p className="partner-description">Green Eats Co. donates surplus produce daily.</p></div>
            <div className="partner-card"><img src={partner2Img} alt="Community Kitchen" className="partner-logo" style={{ height: '50px' }} /><p className="partner-description">Community Kitchen serves meals to those in need.</p></div>
            <div className="partner-card"><img src={partner3Img} alt="Eco Bakery" className="partner-logo" /><p className="partner-description">Eco Bakery shares fresh baked goods weekly.</p></div>
            <div className="partner-card"><img src={partner4Img} alt="Urban Farm" className="partner-logo" style={{ height: '35px' }} /><p className="partner-description">Urban Farm provides organic vegetables.</p></div>
            <div className="partner-card"><img src={partner5Img} alt="Food Rescue" className="partner-logo" /><p className="partner-description">Food Rescue coordinates large-scale donations.</p></div>
        </div>
      </section>

      <section className="content-section">
        <div className="impact-section">
          <h2 className="section-title">Our Impact, Together</h2>
          <p className="section-subtitle">Every contribution helps build a more sustainable future. Here’s what we’ve achieved so far:</p>
          <div className="stats-grid">
            <div className="stat-item"><span className="stat-value">1,250+ kg</span><span className="stat-label">Food Saved</span><div className="progress-bar"><div className="progress-fill" style={{ '--progress-width': '75%' }}></div></div></div>
            <div className="stat-item"><span className="stat-value">3,000+</span><span className="stat-label">Meals Provided</span><div className="progress-bar"><div className="progress-fill" style={{ '--progress-width': '60%' }}></div></div></div>
            <div className="stat-item"><span className="stat-value">15+</span><span className="stat-label">Cities Active</span><div className="progress-bar"><div className="progress-fill" style={{ '--progress-width': '45%' }}></div></div></div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Our Community Impact Map</h2>
        <p className="section-subtitle">Explore where FoodShare is making a difference across the globe.</p>
        <div className="map-placeholder">
          <img src={mapPlaceholderImg} alt="Interactive map of FoodShare impact" className="map-image" />
          <p>Interactive map coming soon! See where we’re active and the impact we’re making.</p>
        </div>
        <a href="pages/map.html" className="btn btn-primary">Explore the Map</a>
      </section>

      <section className="content-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqData.map((faq) => (
            <FaqItem key={faq.id} faq={faq} isOpen={openFaqId === faq.id} onToggle={() => handleFaqToggle(faq.id)} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Get Involved</h2>
        <p className="section-subtitle">Join our mission in one of many ways—whether you’re sharing, volunteering, or partnering.</p>
        <div className="get-involved-grid">
          <div className="involve-card"><div className="feature-icon">🍎</div><h3 className="involve-title">Share Food</h3><p className="involve-description">Restaurants, farms, and businesses can donate surplus food to those in need.</p><button onClick={onSignupClick} className="btn btn-secondary">Start Sharing</button></div>
          <div className="involve-card"><div className="feature-icon">🙌</div><h3 className="involve-title">Volunteer</h3><p className="involve-description">Pick up and distribute food in your community to make a direct impact.</p><button onClick={onSignupClick} className="btn btn-primary">Become a Volunteer</button></div>
          <div className="involve-card"><div className="feature-icon">🤝</div><h3 className="involve-title">Partner with Us</h3><p className="involve-description">Collaborate with FoodShare to amplify your organization’s impact.</p><a href="#" className="btn btn-gradient">Contact Us</a></div>
        </div>
      </section>

      <section className="content-section" id="blog-highlights">
        <h2 className="section-title">From Our Blog</h2>
        <p className="section-subtitle">Stay updated with tips, stories, and insights on reducing food waste and building community.</p>
        <div className="blog-grid">
          <div className="blog-card"><img src={blog1Img} alt="Blog post about food waste" className="blog-image" /><h3 className="blog-title">5 Ways to Reduce Food Waste at Home</h3><p className="blog-excerpt">Learn practical tips to minimize waste and make a difference in your kitchen.</p><a href="#" className="btn btn-secondary">Read More</a></div>
          <div className="blog-card"><img src={blog2Img} alt="Blog post about community sharing" className="blog-image" /><h3 className="blog-title">How FoodShare Strengthens Communities</h3><p className="blog-excerpt">Discover the stories behind our platform’s impact on local neighborhoods.</p><a href="#" className="btn btn-secondary">Read More</a></div>
          <div className="blog-card"><img src={blog3Img} alt="Blog post about sustainable practices" className="blog-image" /><h3 className="blog-title">Sustainable Practices for Businesses</h3><p className="blog-excerpt">Explore how your business can adopt eco-friendly food-sharing practices.</p><a href="#" className="btn btn-secondary">Read More</a></div>
        </div>
      </section>

      <section className="cta-banner">
        <h2 className="cta-title">Ready to Make a Difference?</h2>
        <p className="cta-description">Join thousands of users reducing food waste and supporting communities with FoodShare.</p>
        <div className="cta-buttons">
          <a href="#how-it-works" className="btn btn-gradient">Learn More</a>
          <button onClick={onSignupClick} className="btn btn-primary">Join Now</button>
        </div>
      </section>
    </>
  );
}

export default HomePage;