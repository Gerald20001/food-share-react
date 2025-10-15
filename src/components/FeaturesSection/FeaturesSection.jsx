import { motion } from 'framer-motion';
import FeatureCard from '../FeatureCard/FeatureCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 }, 
  visible: { 
    y: 0, 
    opacity: 1, 
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
    <motion.section 
      className="features-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible" 
    >
      {featuresData.map((feature, index) => (
        <FeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          variants={cardVariants}
        />
      ))}
    </motion.section>
  );
}

export default FeaturesSection;