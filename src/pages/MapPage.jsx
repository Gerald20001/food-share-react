import { useState } from 'react';
import MapComponent from '../components/MapComponent/MapComponent';
import { useDebounce } from '../hooks/useDebounce'; // Возвращаем наш хук
import { useTitle } from '../hooks/useTitle';
import './MapPage.css';

function MapPage() {
    useTitle('Карта объявлений');
  const [category, setCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const [isFilterOpen, setIsFilterOpen] = useState(window.innerWidth > 768);
  const [searchAddress, setSearchAddress] = useState('');

  const handleAddressSearch = async (event) => {
    event.preventDefault(); 
    if (!searchAddress) {
      setSearchLocation(null);
      return;
    };
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setSearchLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
        if (window.innerWidth <= 768) setIsFilterOpen(false);
      } else {
        alert('Адрес не найден.');
      }
    } catch (error) {
      console.error('Ошибка при поиске адреса:', error);
      alert('Произошла ошибка при поиске.');
    }
  };

  return (
    <div className="map-page-container">
      <button className="filter-toggle btn btn-secondary" onClick={() => setIsFilterOpen(!isFilterOpen)}>
        {isFilterOpen ? '✖' : '☰'}
      </button>

      <aside className={`filters-panel ${isFilterOpen ? 'open' : ''}`}>
        <div className="filters-header">
          <h2>Фильтры</h2>
        </div>
        
        <div>
          <div className="filter-group">
            <label htmlFor="search">Поиск по названию</label>
            <input 
              type="text" 
              id="search" 
              placeholder="Например, 'хлеб' или 'овощи'" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          <div className="filter-group">
            <label htmlFor="address">Поиск по адресу</label>
            <form onSubmit={handleAddressSearch} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                id="address" 
                placeholder="Введите адрес" 
                value={searchAddress} 
                onChange={(e) => setSearchAddress(e.target.value)} 
              />
              <button type="submit" className="btn btn-primary">Найти</button>
            </form>
          </div>
          
          <div className="filter-group">
            <label htmlFor="category">Категория</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Все</option>
              <option value="bakery">Выпечка</option>
              <option value="produce">Овощи и фрукты</option>
              <option value="dairy">Молочные продукты</option>
            </select>
          </div>
        </div>
      </aside>

      <MapComponent 
        searchLocation={searchLocation} 
        category={category}
        searchTerm={debouncedSearchTerm}
      />
    </div>
  );
}

export default MapPage;