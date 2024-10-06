import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { Clock, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
})


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
        const kmDistance = (data.routes[0].distance / 1000).toFixed(2);

        setDistance(kmDistance);
        setDuration(Math.floor(data.routes[0].duration / 60));

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
    <div className="flex flex-col space-y-1  mb-4" style={{ height: '55vh' }}> {/* 画面全体の高さを確保 */}
      <div className="flex-grow bg-gray-200 rounded-lg mb-4 relative" style={{ height: '80%' }}>
        <MapContainer
          center={[37.4275, -122.1697]} // スタンフォード大学
          zoom={13}
          style={{ height: '100%', width: '100%' }} // 90%の高さを指定
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

          {start && (
            <Marker position={[start.lat, start.lng]} >
              <Popup>出発地点</Popup>
            </Marker>
          )}
          {end && (
            <Marker position={[end.lat, end.lng]}>
              <Popup>到着地点</Popup>
            </Marker>
          )}
          <RouteDisplay route={route} />
        </MapContainer>
      </div>
      <div className="bg-blue-100 rounded-lg p-4 mb-4" style={{ height: '20%' }}> {/* なぜか残りの20%でうまく描画される */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">  
            <Navigation className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-semibold">Distance</span>
          </div>
          <span>{distance}km</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-semibold">ETA</span>
          </div>
          <span>{duration}min</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
