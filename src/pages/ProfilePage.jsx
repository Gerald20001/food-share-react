import { useParams } from 'react-router-dom';
import './ProfilePage.css';
import NotFoundPage from './NotFoundPage';
import { useTitle } from '../hooks/useTitle';

// 1. ИСПРАВЛЕНИЕ: Импортируем данные о пользователях из центрального файла.
// Мы используем `as mockUsers`, чтобы остальной код не пришлось менять.
import { users as mockUsers } from '../data/mockData';

// Простой компонент для отображения звезд рейтинга
function StarRating({ rating }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const stars = [];
  useTitle(user ? user.name : 'Профиль');
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
  const user = mockUsers[userId]; // Теперь эта строка будет работать, т.к. mockUsers импортирован

  if (!user) {
    return <NotFoundPage />;
  }

  return (
    <>
      <header className="profile-header">
        <div className="profile-cover-image">
          <img src={user.coverUrl} alt="Cover" />
        </div>
        <div className="profile-avatar-container">
          <img src={user.avatarUrl} alt={user.name} className="profile-page-avatar" />
          <div className="profile-title">
            <h1>{user.name}</h1>
            {user.isVerified && <p className="verified-badge">✔ Проверенная организация</p>}
          </div>
        </div>
      </header>

      <section className="profile-stats-bar">
        <div className="stat-item"><span className="stat-value">{user.stats.offers}</span><span className="stat-label">Объявлений</span></div>
        <div className="stat-item"><span className="stat-value">{user.stats.reviews}</span><span className="stat-label">Отзывов</span></div>
        <div className="stat-item"><span className="stat-value">{user.stats.rating} / 5</span><span className="stat-label">Рейтинг</span></div>
      </section>

      <main className="profile-main-content">
        <section className="profile-about">
          <h2>О нас</h2>
          <p>{user.description}</p>
        </section>
        <section className="profile-reviews">
          <h2>Отзывы ({user.reviews.length})</h2>
          {user.reviews.map((review, index) => (
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