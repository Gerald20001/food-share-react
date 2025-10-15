import { motion } from 'framer-motion';
import './FeatureCard.css';

function FeatureCard({ icon, title, description, variants }) {
  return (
    <motion.div className="feature-card" variants={variants}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;