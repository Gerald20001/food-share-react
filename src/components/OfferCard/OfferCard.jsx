import { Link } from 'react-router-dom';
import { useOffers } from '../../context/OfferContext'; // 1. Импортируем хук
import { useToast } from '../../context/ToastContext';
import './OfferCard.css';
    
function OfferCard({ offer }) {
  // 2. Получаем функции из контекстов
  const { deleteOffer } = useOffers();
  const { addToast } = useToast();
  
  // 3. Деструктурируем все нужные данные из offer
  const { id, title, location, status, imageUrl } = offer;

  const statusClass = {
    'Active': 'status-active',
    'Reserved': 'status-reserved',
    'Confirmed': 'status-confirmed',
  }[status] || '';

  // 4. Обработчик для кнопки удаления
  const handleDelete = () => {
    // Спрашиваем подтверждение перед удалением - это хорошая практика!
    if (window.confirm(`Вы уверены, что хотите удалить "${title}"?`)) {
      deleteOffer(id);
      addToast('Объявление успешно удалено', 'error');
    }
  };

  return (
    <div className="offer-card">
      <img src={imageUrl} alt={title} className="offer-card-image" />
      <div className="offer-card-content">
        {/* 5. ИСПРАВЛЕНИЕ: Добавляем недостающий контент */}
        <h3>{title}</h3>
        <p className="card-meta">Location: {location}</p>
        <p className="card-meta">
          Status: <span className={statusClass}>{status}</span>
        </p>

        <div className="card-actions">
          <Link to={`/edit-offer/${id}`} className="btn btn-secondary">
            Edit
          </Link>
          {/* 6. Вешаем обработчик на кнопку */}
          <button onClick={handleDelete} className="btn btn-secondary" style={{borderColor: '#ef4444', color: '#ef4444'}}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;