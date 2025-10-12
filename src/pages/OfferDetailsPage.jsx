import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './OfferDetailsPage.css';
import NotFoundPage from './NotFoundPage';
import { useOffers } from '../context/OfferContext';

function OfferDetailsPage() {
  const { offerId } = useParams();
  const { getOfferById } = useOffers();
  const offer = getOfferById(offerId);

  if (!offer) {
    return <NotFoundPage />;
  }

  return (
    <div className="offer-details-container">
      {/* Левая колонка */}
      <div className="offer-details-media">
        <img src={offer.imageUrl} alt={offer.title} />
        <MapContainer center={offer.position} zoom={15} className="offer-details-map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={offer.position}></Marker>
        </MapContainer>
      </div>

      {/* Правая колонка */}
      <div className="offer-details-info">
        <h1 className="offer-title">{offer.title}</h1>
        <p className="offer-meta">
          {/*
            ГЛАВНОЕ ИЗМЕНЕНИЕ:
            Раньше было: <Link to={'/profile/1'}>
            Теперь мы используем ID пользователя из данных объявления: offer.userId
          */}
          от <Link to={`/profile/${offer.userId}`}>{offer.location}</Link>
        </p>
        <p className="offer-description">{offer.description}</p>

        <ul className="offer-specs">
          {offer.specs && offer.specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
        
        <button className="btn btn-primary btn-claim">Забрать</button>
      </div>
    </div>
  );
}

export default OfferDetailsPage;