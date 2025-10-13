import { motion } from 'framer-motion';

// 1. Определяем варианты (variants) для нашей анимации
const animations = {
  initial: { opacity: 0, x: 100 },   // Начальное состояние: прозрачно и смещено на 100px вправо
  animate: { opacity: 1, x: 0 },     // Конечное состояние: полностью видимо и на своем месте (x: 0)
  exit: { opacity: 0, x: -100 },    // Состояние при выходе: прозрачно и смещено на 100px влево
};

// 2. Создаем компонент-обертку
function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }} // Длительность анимации
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;