"use client";
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api';
import { Clock, Navigation } from 'lucide-react';
import React, { useCallback, useState } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.7128,
  lng: -74.0060, // New York City center
};

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];


const Map: React.FC<MapProps> = () => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [estimatedTime, setEstimatedTime] = useState<string>('');
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
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
      setDistance(result.routes[0].legs[0].distance?.text || '');
      setEstimatedTime(result.routes[0].legs[0].duration?.text || '');
    }
  }, []);

  const directionsOptions: google.maps.DirectionsRequest = {
    destination: destination,
    origin: origin,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  if (loadError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading maps: {loadError.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-96">Loading maps...</div>;
  }


  return (
    <div>
      <div className="flex-grow bg-gray-200 rounded-lg mb-4 relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={9}
        >
          {/* <Marker position={origin} /> */}
          <Marker position={destination} />
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
      </div>
      <div className="bg-blue-100 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Navigation className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-semibold">Distance</span>
          </div>
          <span>{distance}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-500" />
            <span className="font-semibold">ETA</span>
          </div>
          <span>{estimatedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Map;

