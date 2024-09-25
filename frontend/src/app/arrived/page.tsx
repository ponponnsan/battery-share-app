"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Clock, MapPin, Navigation, Package, Phone } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Map from "@/components/maps/google-map";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const CommuteCargaDeliveryNavigation = () => {
  const [estimatedTime, setEstimatedTime] = useState('25 min');
  const [distance, setDistance] = useState('7.5 km');
  const router = useRouter();

  // Mock delivery details
  const deliveryDetails = {
    address: '2-1-1 Nihonbashi, Chuo-ku, Tokyo',
    recipientName: 'Sato Hana',
    phoneNumber: '090-9876-5432',
    cargoDescription: 'Medium-sized package, handle with care',
  };

  // Mock vehicles details
  const vehicles = [
    { lat: 35.6762, lng: 139.6503 },
    { lat: 35.6895, lng: 139.6917 },
  ];


  const handleDelivered = () => {
    console.log('Cargo delivered successfully');
    router.push("/driver-complete-delivery");
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <ArrowLeft className="h-6 w-6 mr-4" />
        <h2 className="text-xl font-bold flex-grow">Navigate to Delivery</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            Delivery Location
          </h3>
          <p>{deliveryDetails.address}</p>
        </div>

        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
          <div className="flex-grow bg-gray-200 rounded-lg mb-4 relative">
            <Map />
          </div>
        </LoadScript>

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

        <div className="bg-green-100 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2">Recipient Details</h3>
          <p>{deliveryDetails.recipientName}</p>
          <div className="flex items-center mt-2">
            <Phone className="h-5 w-5 mr-2 text-green-500" />
            <a href={`tel:${deliveryDetails.phoneNumber}`} className="text-blue-500 underline">
              {deliveryDetails.phoneNumber}
            </a>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <Package className="h-5 w-5 mr-2 text-yellow-500" />
            Cargo Details
          </h3>
          <p>{deliveryDetails.cargoDescription}</p>
        </div>

        <Button 
          onClick={handleDelivered}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
        >
          Confirm Delivery
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDeliveryNavigation;