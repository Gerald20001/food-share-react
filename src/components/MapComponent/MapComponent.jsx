import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './MapComponent.css';
import { useOffers } from '../../context/OfferContext'; 

// Те же самые "моковые" данные
const mockOffers = [
    { id: 1, title: 'Свежий хлеб', position: [49.2331, 28.4682], imageUrl: 'https://images.unsplash.com/photo-1581331473244-887d155375d0?q=80&w=2940&auto=format&fit=crop' },
    { id: 2, title: 'Свежие овощи', position: [49.2300, 28.4700], imageUrl: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac8?q=80&w=2940&auto=format&fit=crop' },
    { id: 3, title: 'Молочные продукты', position: [49.2355, 28.4655], imageUrl: 'https://images.unsplash.com/photo-1628038455627-0e6b356c9a38?q=80&w=2942&auto=format&fit=crop' },
];

function MapComponent() {
  // Координаты центра карты (Винница)
    const { offers } = useOffers(); 
  const mapCenter = [49.2331, 28.4682];
  

  return (
    <MapContainer center={mapCenter} zoom={14} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {offers.map(offer => ( // <-- ИЗМЕНЕНИЕ
        <Marker key={offer.id} position={offer.position}>
          <Popup>
            <div className="popup-content">
              <img src={offer.imageUrl} alt={offer.title} />
              <h3>{offer.title}</h3>
              {/* Ссылка на будущую страницу деталей объявления */}
              <Link to={`/offer/${offer.id}`} className="btn btn-primary">
                Детали
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;