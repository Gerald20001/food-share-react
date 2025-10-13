import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { useOffers } from '../../context/OfferContext';
import MapController from './MapController';
import './MapComponent.css';

function MapComponent({ searchLocation, category, searchTerm }) {
  const { offers } = useOffers();
  const defaultCenter = { lat: 49.2331, lon: 28.4682 };
  
  const filteredOffers = useMemo(() => {
    // Приводим поисковый запрос к нижнему регистру один раз для эффективности
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    return offers.filter(offer => {
      // Фильтр по категории
      const categoryMatch = category === 'all' || (offer.category && offer.category.toLowerCase() === category);
      if (!categoryMatch) return false;

      // ВОЗВРАЩАЕМ: Фильтр по поисковому запросу
      const searchMatch = !lowercasedSearchTerm || offer.title.toLowerCase().includes(lowercasedSearchTerm);
      if (!searchMatch) return false;
      
      return true; // Показываем объявление, если оно прошло все проверки
    });
  }, [offers, category, searchTerm]); // Добавляем searchTerm в зависимости

  return (
    <MapContainer center={[defaultCenter.lat, defaultCenter.lon]} zoom={13} className="map-container">
      <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
      
      {filteredOffers.map(offer => (
        <Marker key={offer.id} position={offer.position}>
          <Popup>
            <div className="popup-content">
              <img src={offer.imageUrl} alt={offer.title} />
              <h3>{offer.title}</h3>
              <p>{offer.location}</p>
              <Link to={`/offer/${offer.id}`} className="btn btn-primary">
                Детали
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}

      <MapController searchLocation={searchLocation} />
    </MapContainer>
  );
}

export default MapComponent;