import { motion } from 'framer-motion';
import FeatureCard from '../FeatureCard/FeatureCard'; // Импортируем нашу карточку

// 1. Определяем варианты анимации для контейнера
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Задержка между появлением дочерних элементов
      staggerChildren: 0.2 
    }
  }
};

// 2. Определяем варианты анимации для каждой карточки
const cardVariants = {
  hidden: { y: 20, opacity: 0 }, // Начальное состояние: смещена вниз и прозрачна
  visible: { 
    y: 0, 
    opacity: 1,   // Конечное состояние: на своем месте и видима
    transition: {
      duration: 0.5
    }
  } 
};

const featuresData = [
  { icon: "🌍", title: "Find Nearby", description: "Instantly locate available food in your local area." },
  { icon: "🤝", title: "Share Surplus", description: "Easily post what you have to share with others." },
  { icon: "♻️", title: "Reduce Waste", description: "Contribute to a greener, more sustainable world." },
];

function FeaturesSection() {
  return (
    // 3. Используем motion.div для контейнера
    <motion.section 
      className="features-grid"
      variants={containerVariants}
      initial="hidden"  // Начинаем с состояния 'hidden'
      animate="visible" // Анимируем к состоянию 'visible'
    >
      {featuresData.map((feature, index) => (
        <FeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          variants={cardVariants} // Передаем анимацию в дочерний компонент
        />
      ))}
    </motion.section>
  );
}

export default FeaturesSection;