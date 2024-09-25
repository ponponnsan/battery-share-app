"use client";
import { useState, useCallback } from 'react';
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
  Marker, // Markerをインポート
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.7128,
  lng: -74.0060, // New York City center
};

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ['places'];

const Map: React.FC = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const origin = { lat: 41.0534, lng: -73.5387 }; // Stamford, CT
  const destination = { lat: 40.7128, lng: -74.0060 }; // New York City

  const directionsCallback = useCallback((
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (result !== null && status === 'OK') {
      setDirections(result);
    }
  }, []);

  const directionsOptions: google.maps.DirectionsRequest = {
    destination: destination,
    origin: origin,
    travelMode: 'DRIVING',
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={9}
      >
        <Marker position={origin}  />
        <Marker position={destination} label="B" />
        <DirectionsService
          options={directionsOptions}
          callback={directionsCallback}
        />
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#4285F4",
                strokeWeight: 5,
              },
            }}
          />
        )}
      </GoogleMap>
  );
};

export default Map;
