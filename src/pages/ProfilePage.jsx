import { useParams } from 'react-router-dom';
import './ProfilePage.css';
import NotFoundPage from './NotFoundPage';

// 1. Убеждаемся, что мы импортируем данные о пользователях
import { users as mockUsers } from '../data/mockData';

// Компонент для отображения звезд рейтинга
function StarRating({ rating }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={`full-${i}`}>★</span>);
  }
  for (let i = fullStars; i < totalStars; i++) {
    stars.push(<span key={`dim-${i}`} className="dim-star">★</span>);
  }
  return <div className="review-stars">{stars}</div>;
}

function ProfilePage() {
  const { userId } = useParams();
  // 2. Получаем данные пользователя из импортированного объекта
  const userProfile = mockUsers[userId];

  // 3. Проверяем, найден ли пользователь. Если нет - показываем 404.
  if (!userProfile) {
    return <NotFoundPage />;
  }

  // 4. Используем `userProfile`, чтобы избежать конфликтов имен
  return (
    <>
      <header className="profile-header">
        <div className="profile-cover-image">
          <img src={userProfile.coverUrl} alt="Cover" />
        </div>
        <div className="profile-avatar-container">
          <img src={userProfile.avatarUrl} alt={userProfile.name} className="profile-page-avatar" />
          <div className="profile-title">
            <h1>{userProfile.name}</h1>
            {userProfile.isVerified && <p className="verified-badge">✔ Проверенная организация</p>}
          </div>
        </div>
      </header>

      <section className="profile-stats-bar">
        <div className="stat-item"><span className="stat-value">{userProfile.stats.offers}</span><span className="stat-label">Объявлений</span></div>
        <div className="stat-item"><span className="stat-value">{userProfile.stats.reviews}</span><span className="stat-label">Отзывов</span></div>
        <div className="stat-item"><span className="stat-value">{userProfile.stats.rating} / 5</span><span className="stat-label">Рейтинг</span></div>
      </section>

      <main className="profile-main-content">
        <section className="profile-about">
          <h2>О нас</h2>
          <p>{userProfile.description}</p>
        </section>
        <section className="profile-reviews">
          <h2>Отзывы ({userProfile.reviews.length})</h2>
          {userProfile.reviews.map((review, index) => (
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