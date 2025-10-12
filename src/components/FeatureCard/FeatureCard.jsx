import './FeatureCard.css';

// Мы получаем объект props и сразу "деструктурируем" его,
// доставая нужные нам значения: icon, title, description.
function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      {/* Вместо текста вставляем наши переменные из props */}
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default FeatureCard;