import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
interface RoutePoint {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  start: RoutePoint | null;
  end: RoutePoint | null;
}

// This component uses the useMap hook to access the Leaflet map
const RouteDisplay: React.FC<{ route: L.Polyline | null }> = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route) {
      route.addTo(map); // Add route to the map when available
    }
    return () => {
      if (route) {
        route.remove(); // Cleanup when route is removed
      }
    };
  }, [map, route]);

  return null; // This component doesn't render anything directly
};

const MapComponent: React.FC<MapComponentProps> = ({ start, end }) => {
  const [route, setRoute] = useState<L.Polyline | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  // Route calculation logic
  const calculateRoute = async (start: RoutePoint, end: RoutePoint) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const routeCoordinates = data.routes[0].geometry.coordinates.map(
          (coord: number[]) => [coord[1], coord[0]]
        );

        setDistance(data.routes[0].distance);
        setDuration(data.routes[0].duration);

        // Draw route on the map
        const newRoute = L.polyline(routeCoordinates, {
          color: 'blue',
          weight: 3,
          opacity: 0.7,
        });
        setRoute(newRoute);
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  // Calculate route whenever start or end changes
  useEffect(() => {
    if (start && end) {
      calculateRoute(start, end);
    }
  }, [start, end]);

  return (
    <MapContainer
      center={[35.6895, 139.6917]} // Tokyo
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {start && (
        <Marker position={[start.lat, start.lng]}>
          <Popup>出発地点</Popup>
        </Marker>
      )}
      {end && (
        <Marker position={[end.lat, end.lng]}>
          <Popup>到着地点</Popup>
        </Marker>
      )}
      <RouteDisplay route={route} /> {/* Pass the route to the RouteDisplay component */}
      {distance && duration && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow">
          <p>距離: {(distance / 1000).toFixed(2)} km</p>
          <p>予想所要時間: {Math.round(duration / 60)} 分</p>
        </div>
      )}
    </MapContainer>
  );
};

export default MapComponent;
