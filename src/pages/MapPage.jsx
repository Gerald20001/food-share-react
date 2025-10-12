import './MapPage.css';
import MapComponent from '../components/MapComponent/MapComponent';

function MapPage() {
  return (
    <div className="map-page-container">
      <aside className="filters-panel">
        <h2>Фильтры</h2>
        <div className="filter-group">
          <label htmlFor="distance">Радиус поиска (км)</label>
          <input type="range" id="distance" name="distance" min="1" max="50" defaultValue="5" />
        </div>
        <div className="filter-group">
          <label htmlFor="category">Категория</label>
          <select id="category" name="category">
            <option value="all">Все</option>
            <option value="bakery">Выпечка</option>
            <option value="produce">Овощи и фрукты</option>
            <option value="dairy">Молочные продукты</option>
          </select>
        </div>
        {/* Можно добавить еще фильтры */}
      </aside>

      <MapComponent />
    </div>
  );
}

export default MapPage;