"use client";  // これが必要な場合は忘れずに追加

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 35.6762,
  lng: 139.6503,
};

interface MyMapProps {
  vehicles: { lat: number, lng: number }[];  // 車両の位置データの型
}

const Map: React.FC<MyMapProps> = ({ vehicles }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
        {vehicles.map((vehicle, index) => (
          <Marker
            key={index}
            position={vehicle}
            icon="/path/to/vehicle-icon.png"
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
