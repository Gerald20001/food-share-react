import { motion } from 'framer-motion';
import './FeatureCard.css'; // Убедись, что этот CSS-файл существует

// Мы добавим `variants` как prop, чтобы передать анимацию из родителя
function FeatureCard({ icon, title, description, variants }) {
  return (
    // Оборачиваем div в motion.div и передаем ему variants
    <motion.div className="feature-card" variants={variants}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  );
}

export default FeatureCard;