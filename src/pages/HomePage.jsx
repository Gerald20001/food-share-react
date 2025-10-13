import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, Building2, Heart, TrendingUp, MapPin, Calendar } from 'lucide-react';

// Компоненты
import Hero from '../components/Hero/Hero';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import FaqItem from '../components/FaqItem/FaqItem';
import './HomePage.css';

// Данные для страницы (в будущем можно вынести)
const faqData = [
  { id: 1, question: 'Is the food really free?', answer: 'Yes, absolutely. The core principle of FoodShare is that all food is shared freely. Organizations provide it as a donation to reduce waste, and volunteers pick it up at no cost.' },
  { id: 2, question: 'Is the food safe to eat?', answer: 'All organizations are encouraged to share only food that is safe for consumption. Each offer includes an expiry date, and our rating system helps maintain a high standard of quality and trust.' },
  { id: 3, question: 'Who can sign up as an organization?', answer: 'Any registered business or entity that handles food can join, including restaurants, cafes, bakeries, grocery stores, farms, and event caterers. We have a verification process to ensure all listed organizations are legitimate.' },
  { id: 4, question: 'How do I become a volunteer?', answer: 'Sign up as a volunteer through our platform, create a profile, and start browsing available food listings in your area. It\'s quick, easy, and free!' },
  { id: 5, question: 'Can I donate money instead of food?', answer: 'While our platform focuses on food sharing, we partner with nonprofits that accept monetary donations to support our mission. Contact us to learn more!' }
];

const testimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Bakery Owner, San Francisco', quote: 'Since joining FoodShare, our bakery has donated over 500 loaves of bread, reducing waste and feeding families in need.', image: '👩‍🍳' },
  { id: 2, name: 'Michael Lee', role: 'Volunteer, Chicago', quote: 'As a volunteer, I\'ve connected with local businesses and helped distribute fresh meals to those who need them most.', image: '👨‍💼' },
  { id: 3, name: 'Emily Carter', role: 'Nonprofit Coordinator, New York', quote: 'FoodShare\'s platform has streamlined our food distribution, allowing us to focus on serving our community.', image: '👩‍💻' }
];

const blogPosts = [
  { id: 1, title: '5 Ways to Reduce Food Waste at Home', excerpt: 'Learn practical tips to minimize waste and make a difference in your kitchen.', date: '2025-03-15', image: '🏠' },
  { id: 2, title: 'How FoodShare Strengthens Communities', excerpt: 'Discover the stories behind our platform\'s impact on local neighborhoods.', date: '2025-03-10', image: '🤝' },
  { id: 3, title: 'Sustainable Practices for Businesses', excerpt: 'Explore how your business can adopt eco-friendly food-sharing practices.', date: '2025-03-05', image: '🌱' }
];

function HomePage() {
  const { onSignupClick } = useOutletContext();
  const [openFaqId, setOpenFaqId] = useState(null);

  // Intersection observers для анимаций при скролле
  const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleFaqToggle = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const scrollToExplore = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homepage">
      <Hero onExploreClick={scrollToExplore} />
      <FeaturesSection />

      <section className={`content-section mission-section ${missionInView ? 'fade-in' : ''}`} ref={missionRef}>
        <div className="mission-icon"><Heart size={48} strokeWidth={2} /></div>
        <h2 className="section-title">Our Mission</h2>
        <p className="mission-text">
          We believe that good food belongs in homes, not in landfills. Our mission is to build a bridge between surplus and scarcity, creating a sustainable cycle where every meal finds a purpose. We're not just fighting food waste — we're strengthening community bonds, one share at a time.
        </p>
      </section>

      <section className="content-section" id="how-it-works" ref={stepsRef}>
        <h2 className="section-title">A Simple Way to Make a Difference</h2>
        <p className="section-subtitle">Our platform makes it incredibly easy to connect those with surplus food to those in need, in just three simple steps.</p>
        <div className={`steps-grid ${stepsInView ? 'animate-steps' : ''}`}>
          <div className="step-card"><div className="step-icon"><Building2 size={32} /></div><h3 className="step-title">Post Your Surplus</h3><p className="step-description">Organizations can quickly post details about their available food, including type, quantity, and pickup times.</p></div>
          <div className="step-card"><div className="step-icon"><MapPin size={32} /></div><h3 className="step-title">Find & Claim</h3><p className="step-description">Volunteers browse a real-time map, find food nearby, and claim it with a single click.</p></div>
          <div className="step-card"><div className="step-icon"><Users size={32} /></div><h3 className="step-title">Connect & Share</h3><p className="step-description">Once a claim is approved, the volunteer picks up the food. It's that simple to reduce waste and help others.</p></div>
        </div>
      </section>

      <section className="content-section">
        <h2 className="section-title">Who is FoodShare for?</h2>
        <div className="user-types-grid">
          <div className="user-type-card"><div className="feature-icon"><Building2 size={48} /></div><h3>For Organizations</h3><ul><li>Reduce disposal costs</li><li>Enhance your brand's social responsibility</li><li>Track your positive environmental impact</li><li>Connect directly with local volunteers</li></ul><button onClick={onSignupClick} className="btn btn-secondary">Share Food</button></div>
          <div className="user-type-card"><div className="feature-icon"><Users size={48} /></div><h3>For Volunteers</h3><ul><li>Find free, quality food nearby</li><li>Support your community and neighbors</li><li>Help reduce food waste in your city</li><li>Discover local businesses and charities</li></ul><button onClick={onSignupClick} className="btn btn-primary">Find Food</button></div>
        </div>
      </section>

      <section className="content-section" ref={statsRef}>
        <div className={`impact-section ${statsInView ? 'animate-progress' : ''}`}>
          <div className="impact-header"><TrendingUp size={40} /><h2 className="section-title">Our Impact, Together</h2></div>
          <p className="section-subtitle">Every contribution helps build a more sustainable future. Here's what we've achieved so far:</p>
          <div className="stats-grid">
            <div className="stat-item"><span className="stat-value">{statsInView ? <CountUp start={0} end={1250} duration={2.5} separator="," suffix="+" /> : '1,250+'}</span><span className="stat-label">kg Food Saved</span><div className="progress-bar"><div className="progress-fill" style={{ '--progress-width': '75%' }}></div></div></div>
            <div className="stat-item"><span className="stat-value">{statsInView ? <CountUp start={0} end={3000} duration={2.5} separator="," suffix="+" /> : '3,000+'}</span><span className="stat-label">Meals Provided</span><div className="progress-bar"><div className="progress-fill" style={{ '--progress-width': '60%' }}></div></div></div>
            <div className="stat-item"><span className="stat-value">{statsInView ? <CountUp start={0} end={15} duration={2.5} suffix="+" /> : '15+'}</span><span className="stat-label">Cities Active</span><div className="progress-bar"><div className="progress-fill" style={{ '--progress-width': '45%' }}></div></div></div>
          </div>
        </div>
      </section>

      <section className="content-section" ref={testimonialsRef}>
        <h2 className="section-title">Success Stories</h2>
        <p className="section-subtitle">Discover how FoodShare is transforming lives and communities through the power of sharing.</p>
        <div className={`testimonials-grid ${testimonialsInView ? 'animate-testimonials' : ''}`}>
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card" style={{ animationDelay: `${index * 0.15}s` }}><div className="quote-mark">"</div><p className="testimonial-quote">{testimonial.quote}</p><div className="testimonial-author"><div className="author-avatar">{testimonial.image}</div><div><p className="author-name">{testimonial.name}</p><p className="author-role">{testimonial.role}</p></div></div></div>
          ))}
        </div>
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
        <h2 className="section-title">From Our Blog</h2>
        <p className="section-subtitle">Stay updated with tips, stories, and insights on reducing food waste and building community.</p>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card"><div className="blog-image-wrapper"><div className="blog-emoji">{post.image}</div></div><div className="blog-content"><div className="blog-meta"><Calendar size={16} /><span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div><h3 className="blog-title">{post.title}</h3><p className="blog-excerpt">{post.excerpt}</p><a href="#" className="blog-link">Read More →</a></div></article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Make a Difference?</h2>
          <p className="cta-description">Join thousands of users reducing food waste and supporting communities with FoodShare.</p>
          <div className="cta-buttons"><button onClick={scrollToExplore} className="btn btn-gradient">Learn More</button><button onClick={onSignupClick} className="btn btn-primary">Join Now</button></div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;