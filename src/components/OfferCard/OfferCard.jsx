import { Link } from 'react-router-dom';
import { useOffers } from '../../context/OfferContext';
import { useToast } from '../../context/ToastContext';
import './OfferCard.css';
    
function OfferCard({ offer }) {
  const { deleteOffer, approveClaim, denyClaim } = useOffers();
  const { addToast } = useToast();
  
  const { id, title, location, status, imageUrl } = offer;

  const statusClass = {
    'Active': 'status-active',
    'Reserved': 'status-reserved',
    'Confirmed': 'status-confirmed',
  }[status] || '';

  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить "${title}"?`)) {
      deleteOffer(id);
      addToast('Объявление успешно удалено', 'error');
    }
  };

  const handleApprove = () => {
    approveClaim(id);
    addToast('Запрос подтвержден!');
  };

  const handleDeny = () => {
    denyClaim(id);
    addToast('Запрос отклонен.', 'error');
  };

  // Функция для рендеринга кнопок в зависимости от статуса
  const renderActions = () => {
    switch (status) {
      case 'Active':
        return (
          <>
            <Link to={`/edit-offer/${id}`} className="btn btn-secondary">Edit</Link>
            <button onClick={handleDelete} className="btn btn-secondary" style={{borderColor: '#ef4444', color: '#ef4444'}}>Delete</button>
          </>
        );
      case 'Reserved':
        return (
          <>
            <button onClick={handleApprove} className="btn btn-approve">Подтвердить</button>
            <button onClick={handleDeny} className="btn btn-deny">Отклонить</button>
          </>
        );
      case 'Confirmed':
        return <button className="btn btn-success" disabled>Подтверждено</button>;
      default:
        return null;
    }
  };

  return (
    <div className="offer-card">
      <img src={imageUrl} alt={title} className="offer-card-image" />
      <div className="offer-card-content">
        <h3>{title}</h3>
        <p className="card-meta">Location: {location}</p>
        <p className="card-meta">
          Status: <span className={statusClass}>{status}</span>
        </p>

        <div className="card-actions">
          {renderActions()}
        </div>
      </div>
    </div>
  );
}

export default OfferCard;