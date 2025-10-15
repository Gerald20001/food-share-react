import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import './DashboardPage.css';
import OfferCard from '../components/OfferCard/OfferCard';
import { useOffers } from '../context/OfferContext';
import { useAuth } from '../context/AuthContext';
import { useTitle } from '../hooks/useTitle';

function DashboardPage() {
    useTitle('Мой кабинет');
  const { offers } = useOffers();
  const { user } = useAuth();
  
 
  const [parent] = useAutoAnimate();

  const myOffers = offers.filter(offer => offer.userId === user.id);

  return (
    <>
      <div className="dashboard-header">
        <h1>Добро пожаловать, {user.name}!</h1>
        <Link to="/new-offer" className="btn btn-primary">
          Добавить объявление
        </Link>
      </div>

      <section className="dashboard-section">
        <h2>Мои объявления ({myOffers.length})</h2>
        
        {myOffers.length > 0 ? (
          <div className="offers-grid" ref={parent}>
            {myOffers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state-icon">🍽️</span>
            <h3>У вас пока нет активных объявлений</h3>
            <p>Нажмите "Добавить объявление", чтобы поделиться едой и помочь сообществу.</p>
            <Link to="/new-offer" className="btn btn-primary">Начать делиться</Link>
          </div>
        )}
      </section>
    </>
  );
}

export default DashboardPage;