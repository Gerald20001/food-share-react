import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import './DashboardPage.css'; // Переиспользуем стили для сетки

function DashboardSkeleton() {
  return (
    <>
      <div className="dashboard-header">
        {/* Можно добавить скелеты для заголовка и кнопки */}
      </div>
      <section className="dashboard-section">
        <div className="offers-grid">
          {/* Создаем массив из 3х элементов и рендерим скелет для каждого */}
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    </>
  );
}

export default DashboardSkeleton;