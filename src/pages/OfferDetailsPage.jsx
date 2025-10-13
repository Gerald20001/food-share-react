import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useAuth } from '../context/AuthContext';
import { useOffers } from '../context/OfferContext';
import { useToast } from '../context/ToastContext';
import { useTitle } from '../hooks/useTitle';
import NotFoundPage from './NotFoundPage';
import './OfferDetailsPage.css';

function OfferDetailsPage() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getOfferById, claimOffer } = useOffers();
  const { addToast } = useToast();
  
  const offer = getOfferById(offerId);

  useTitle(offer ? offer.title : 'Загрузка...');

  if (!offer) {
    return <NotFoundPage />;
  }
  
  const handleClaim = () => {
    claimOffer(offer.id);
    addToast('Запрос успешно отправлен организации!');
    navigate('/map');
  };

  // --- ОТЛАДОЧНАЯ ВЕРСИЯ ФУНКЦИИ ---
  const renderClaimButton = () => {
    // Этот блок покажет нам в консоли все данные, которые есть у функции
    console.log("--- Проверка renderClaimButton ---");
    console.log("1. Залогинен ли? (isAuthenticated):", isAuthenticated);
    console.log("2. Кто пользователь? (user):", user);
    console.log("3. ID пользователя (user.id):", user ? user.id : 'N/A');
    console.log("4. ID владельца объявления (offer.userId):", offer.userId);
    console.log("5. Роль пользователя (user.role):", user ? user.role : 'N/A');
    console.log("6. Статус объявления (offer.status):", offer.status);

    if (!isAuthenticated) {
      console.log("-> РЕШЕНИЕ: Пользователь не залогинен. Ничего не показываем.");
      return null;
    }

    if (user.role === 'volunteer') {
      console.log("-> РЕШЕНИЕ: Пользователь - Волонтер.");
      switch (offer.status) {
        case 'Active':
          return <button onClick={handleClaim} className="btn btn-primary btn-claim">Забрать</button>;
        case 'Reserved':
          return <button className="btn btn-secondary btn-claim" disabled>Ожидает подтверждения</button>;
        case 'Confirmed':
          return <button className="btn btn-success btn-claim" disabled>Подтверждено</button>;
        default:
          return null;
      }
    }

    if (user.role === 'organization') {
      console.log("-> РЕШЕНИЕ: Пользователь - Организация.");
      if (offer.userId === user.id) {
        console.log("-> ...и это ЕГО объявление.");
        return <Link to="/dashboard" className="btn btn-secondary btn-claim">Управление в дашборде</Link>;
      } else {
        console.log("-> ...но это ЧУЖОЕ объявление.");
        return <button className="btn btn-secondary btn-claim" disabled>Только для волонтеров</button>;
      }
    }

    console.log("-> РЕШЕНИЕ: Не подошло ни одно из условий. Ничего не показываем.");
    return null;
  };

  return (
    <div className="offer-details-container">
      <div className="offer-details-media">
        <img src={offer.imageUrl} alt={offer.title} />
        <MapContainer center={offer.position} zoom={15} className="offer-details-map">
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri'
          />
          <Marker position={offer.position}></Marker>
        </MapContainer>
      </div>

      <div className="offer-details-info">
        <h1 className="offer-title">{offer.title}</h1>
        <p className="offer-meta">от <Link to={`/profile/${offer.userId}`}>{offer.location}</Link></p>
        <p className="offer-description">{offer.description}</p>
        <ul className="offer-specs">
          {offer.specs && offer.specs.map((spec, index) => <li key={index}>{spec}</li>)}
        </ul>
        
        {renderClaimButton()}
      </div>
    </div>
  );
}

export default OfferDetailsPage;