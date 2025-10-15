import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './DashboardPage.css'; 
import '../components/OfferCard/OfferCard.css'; 
import { useOffers } from '../context/OfferContext';
import { useAuth } from '../context/AuthContext';
import { useTitle } from '../hooks/useTitle';

function ClaimedOfferCard({ offer }) {
  const statusInfo = {
    Reserved: { text: 'Ожидает подтверждения', className: 'status-reserved' },
    Confirmed: { text: 'Подтверждено', className: 'status-confirmed' },
  };

  return (
    <div className="offer-card">
      <img src={offer.imageUrl} alt={offer.title} className="offer-card-image" />
      <div className="offer-card-content">
        <h3>{offer.title}</h3>
        <p className="card-meta">от: {offer.location}</p>
        <p className="card-meta">
          Статус: <span className={statusInfo[offer.status]?.className || ''}>
            {statusInfo[offer.status]?.text || offer.status}
          </span>
        </p>
        <div className="card-actions">
          <Link to={`/offer/${offer.id}`} className="btn btn-secondary">
            Детали
          </Link>
        </div>
      </div>
    </div>
  );
}

function VolunteerDashboard() {
  useTitle('Мои заказы');
  const { offers } = useOffers();
  const { user } = useAuth();
  const [parent] = useAutoAnimate();

  const myClaims = offers.filter(offer => offer.claimedBy === user.id);

  return (
    <>
      <div className="dashboard-header">
        <h1>Мои заказы ({myClaims.length})</h1>
        <Link to="/map" className="btn btn-primary">
          Найти новую еду
        </Link>
      </div>

      <section className="dashboard-section">
        {myClaims.length > 0 ? (
          <div className="offers-grid" ref={parent}>
            {myClaims.map(offer => (
              <ClaimedOfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state-icon">🤷‍♂️</span>
            <h3>У вас пока нет активных заказов</h3>
            <p>Перейдите на карту, чтобы найти и зарезервировать доступную еду в вашем районе.</p>
            <Link to="/map" className="btn btn-primary">Перейти на карту</Link>
          </div>
        )}
      </section>
    </>
  );
}

export default VolunteerDashboard;