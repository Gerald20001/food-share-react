import SkeletonCard from '../components/SkeletonCard/SkeletonCard';
import './DashboardPage.css'; 

function DashboardSkeleton() {
  return (
    <>
      <div className="dashboard-header">
      </div>
      <section className="dashboard-section">
        <div className="offers-grid">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    </>
  );
}

export default DashboardSkeleton;