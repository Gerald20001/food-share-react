import { useState } from 'react';
import MapComponent from '../components/MapComponent/MapComponent';
import { useDebounce } from '../hooks/useDebounce';
import { useTitle } from '../hooks/useTitle';
import './MapPage.css';

function MapPage() {
    useTitle('Offers Map');
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
                alert('Address not found.');
            }
        } catch (error) {
            console.error('Error during address search:', error);
            alert('An error occurred during the search.');
        }
    };

    return (
        <div className="map-page-container">
            <button className="filter-toggle btn btn-secondary" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                {isFilterOpen ? '✖' : '☰'}
            </button>

            <aside className={`filters-panel ${isFilterOpen ? 'open' : ''}`}>
                <div className="filters-header">
                    <h2>Filters</h2>
                </div>
                
                <div>
                    <div className="filter-group">
                        <label htmlFor="search">Search by title</label>
                        <input 
                            type="text" 
                            id="search" 
                            placeholder="For example 'bread' or 'vegetables'" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                    </div>

                    <div className="filter-group">
                        <label htmlFor="address">Search by address</label>
                        <form onSubmit={handleAddressSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input 
                                type="text" 
                                id="address" 
                                placeholder="Enter address" 
                                value={searchAddress} 
                                onChange={(e) => setSearchAddress(e.target.value)} 
                            />
                            <button type="submit" className="btn btn-primary">Find</button>
                        </form>
                    </div>
                    
                    <div className="filter-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="all">All</option>
                            <option value="bakery">Bakery</option>
                            <option value="produce">Fruits and Vegetables</option>
                            <option value="dairy">Dairy Products</option>
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
