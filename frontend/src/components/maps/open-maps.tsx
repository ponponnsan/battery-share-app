import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Clock, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

const DefaultIcon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'), // 画像のパス
  iconSize: [25, 41], // アイコンのサイズ
  iconAnchor: [12, 41], // アイコンのアンカー
  popupAnchor: [1, -34], // ポップアップの位置
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'), // シャドウの画像
});


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
    <div style={{ height: '50vh' }}> {/* 画面全体の高さを確保 */}
      <MapContainer
        center={[35.6895, 139.6917]} // Tokyo
        zoom={13}
        style={{ height: '90%', width: '100%' }} // 90%の高さを指定
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

        {start && (
          <Marker position={[start.lat, start.lng]} icon={DefaultIcon}>
            <Popup>出発地点</Popup>
          </Marker>
        )}
        {end && (
          <Marker position={[end.lat, end.lng]} icon={DefaultIcon}>
            <Popup>到着地点</Popup>
          </Marker>
        )}
        <RouteDisplay route={route} />
      </MapContainer>

      <div className="bg-blue-100 rounded-lg p-3 mb-4" style={{ height: '20%' }}> {/* なぜか残りの20%でうまく描画される */}
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
