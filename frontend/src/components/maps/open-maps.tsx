// pages/map.tsx
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

interface RoutePoint {
  lat: number;
  lng: number;
}

const MapComponent = () => {
  const [startPoint, setStartPoint] = useState<RoutePoint | null>(null);
  const [endPoint, setEndPoint] = useState<RoutePoint | null>(null);
  const [route, setRoute] = useState<L.Polyline | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

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
        
        // ルートを地図上に描画
        if (route) {
          route.setLatLngs(routeCoordinates);
        } else {
          const newRoute = L.polyline(routeCoordinates, {
            color: 'blue',
            weight: 3,
            opacity: 0.7,
          });
          setRoute(newRoute);
        }
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      const handleClick = (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        
        if (!startPoint) {
          setStartPoint({ lat, lng });
        } else if (!endPoint) {
          setEndPoint({ lat, lng });
          calculateRoute({ lat: startPoint.lat, lng: startPoint.lng }, { lat, lng });
        } else {
          // リセット
          setStartPoint({ lat, lng });
          setEndPoint(null);
          if (route) {
            route.remove();
            setRoute(null);
          }
        }
      };

      map.on('click', handleClick);

      return () => {
        map.off('click', handleClick);
      };
    }, [map, startPoint, endPoint]);

    return null;
  };

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[35.6895, 139.6917]} // 東京
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {startPoint && (
          <Marker position={[startPoint.lat, startPoint.lng]}>
            <Popup>出発地点</Popup>
          </Marker>
        )}
        {endPoint && (
          <Marker position={[endPoint.lat, endPoint.lng]}>
            <Popup>到着地点</Popup>
          </Marker>
        )}
        <MapEvents />
      </MapContainer>
      {distance && duration && (
        <div className="absolute bottom-4 left-4 bg-white p-4 rounded shadow">
          <p>距離: {(distance / 1000).toFixed(2)} km</p>
          <p>予想所要時間: {Math.round(duration / 60)} 分</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;