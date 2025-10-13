import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

function MapController({ searchLocation }) {
  const map = useMap();

  useEffect(() => {
    if (searchLocation) {
      // Плавно перемещаем карту к найденным координатам
      map.flyTo([searchLocation.lat, searchLocation.lng], 14, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [searchLocation, map]);

  return null;
}

export default MapController;