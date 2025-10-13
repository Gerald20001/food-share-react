import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';
import NotFoundPage from './NotFoundPage';
import { users as mockUsers } from '../data/mockData';

function StarRating({ rating }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < fullStars; i++) { stars.push(<span key={`full-${i}`}>★</span>); }
  for (let i = fullStars; i < totalStars; i++) { stars.push(<span key={`dim-${i}`} className="dim-star">★</span>); }
  return <div className="review-stars">{stars}</div>;
}

function ProfilePage() {
  const { userId } = useParams();
  const { user, isAuthenticated } = useAuth();
  
  const isOwnProfile = isAuthenticated && user.id === parseInt(userId);
  
  // Если это свой профиль - берем "живые" данные из AuthContext.
  // Если чужой - из статичного файла mockUsers.
  const userProfileData = isOwnProfile ? user : mockUsers[userId];

  if (!userProfileData) {
    return <NotFoundPage />;
  }
  
  // Для статистики и отзывов пока всегда используем mockData.
  const staticData = mockUsers[userId];

  return (
    <>
      <header className="profile-header">
        <div className="profile-cover-image">
          <img src={userProfileData.coverUrl || staticData.coverUrl} alt="Cover" />
        </div>
        <div className="profile-avatar-container">
          <img src={userProfileData.avatarUrl} alt={userProfileData.name} className="profile-page-avatar" />
          <div className="profile-title">
            <h1>{userProfileData.name}</h1>
            {staticData?.isVerified && <p className="verified-badge">✔ Проверенная организация</p>}
          </div>
          {isOwnProfile && (
            <Link to="/profile/edit" className="btn btn-secondary edit-profile-btn">
              Редактировать
            </Link>
          )}
        </div>
      </header>

      <section className="profile-stats-bar">
        <div className="stat-item"><span className="stat-value">{staticData.stats.offers}</span><span className="stat-label">Объявлений</span></div>
        <div className="stat-item"><span className="stat-value">{staticData.stats.reviews}</span><span className="stat-label">Отзывов</span></div>
        <div className="stat-item"><span className="stat-value">{staticData.stats.rating} / 5</span><span className="stat-label">Рейтинг</span></div>
      </section>

      <main className="profile-main-content">
        <section className="profile-about">
          <h2>О нас</h2>
          <p>{userProfileData.description || staticData.description}</p>
        </section>
        <section className="profile-reviews">
          <h2>Отзывы ({staticData.reviews.length})</h2>
          {staticData.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <p className="reviewer-name">{review.from}</p>
                <StarRating rating={review.rating} />
              </div>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default ProfilePage;