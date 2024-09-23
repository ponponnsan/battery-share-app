"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { ArrowLeft, X } from 'lucide-react';
import { useRouter } from "next/navigation";

const mapContainerStyle = {
  width: '100%',
  height: '50vh'
};

const center = {
  lat: 35.6812, // Tokyo's latitude
  lng: 139.7671 // Tokyo's longitude
};

const DeliveryWaitingScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const router = useRouter();

  const handleCancel = () => {
    console.log('Driver canceled the delivery');
    router.push("/confirm-registration");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newVehicles = Array(5).fill().map(() => ({
        lat: center.lat + (Math.random() - 0.5) * 0.05,
        lng: center.lng + (Math.random() - 0.5) * 0.05,
      }));
      setVehicles(newVehicles);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center shadow-md">
        <ArrowLeft className="w-6 h-6 text-gray-600" />
        <h1 className="text-lg font-semibold">配達待機中</h1>
        <X className="w-6 h-6 text-gray-600" />
      </div>

      {/* Map */}
      <div className="flex-grow">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
          >
            {vehicles.map((vehicle, index) => (
              <Marker key={index} position={vehicle} icon="/path/to/vehicle-icon.png" />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Info Panel */}
      <div className="bg-white p-4 rounded-t-3xl shadow-lg -mt-6 z-10">
        <p className="text-center text-gray-600 mb-4 font-medium">
          登録されました。オファーが来るまでしばらくお待ちください。
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="font-semibold">Pickup:</span>
            <span>Tokyo Station</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Delivery:</span>
            <span>Shibuya Station</span>
          </div>
        </div>
        <Button 
          onClick={handleCancel}
          className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
        >
          キャンセル
        </Button>
      </div>
    </div>
  );
};

export default DeliveryWaitingScreen;
