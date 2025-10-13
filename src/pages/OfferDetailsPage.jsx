import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './OfferDetailsPage.css';
import NotFoundPage from './NotFoundPage';
import { useOffers } from '../context/OfferContext';
import { useTitle } from '../hooks/useTitle';

function OfferDetailsPage() {
  const { offerId } = useParams();
  const { getOfferById } = useOffers();
  const offer = getOfferById(offerId);
  useTitle(offer ? offer.title : 'Загрузка...');

  if (!offer) {
    return <NotFoundPage />;
  }
  
  // Настройки для спутниковой карты
  const satelliteLayer = {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri'
  };

  return (
    <div className="offer-details-container">
      {/* Левая колонка */}
      <div className="offer-details-media">
        <img src={offer.imageUrl} alt={offer.title} />
        <MapContainer center={offer.position} zoom={15} className="offer-details-map">
          {/* ИЗМЕНЕНИЕ: Используем спутниковый слой */}
          <TileLayer
            url={satelliteLayer.url}
            attribution={satelliteLayer.attribution}
          />
          <Marker position={offer.position}></Marker>
        </MapContainer>
      </div>

      {/* Правая колонка */}
      <div className="offer-details-info">
        <h1 className="offer-title">{offer.title}</h1>
        <p className="offer-meta">
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