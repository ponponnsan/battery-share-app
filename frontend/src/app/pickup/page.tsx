"use client"
import Map from "@/components/maps/google-map";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoadScript } from '@react-google-maps/api';
import { MapPin, Phone } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const CommuteCargoPickupNavigation = () => {
  const [estimatedTime, setEstimatedTime] = useState('15 min');
  const [distance, setDistance] = useState('3.2 km');
  const router = useRouter();
  // Mock pickup details
  const pickupDetails = {
    address: '1-1-2 Otemachi, Chiyoda-ku, Tokyo',
    customerName: 'Tanaka Yuki',
    phoneNumber: '090-1234-5678',
  };

  const handleArrived = () => {
    console.log('Driver has arrived at pickup location');
    router.push("/arrived");
  };

  // Mock vehicles details
  const vehicles = [
    { lat: 35.6762, lng: 139.6503 },
    { lat: 35.6895, lng: 139.6917 },
  ];

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Navigate to Pickup</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            Pickup Location
          </h3>
          <p>{pickupDetails.address}</p>
        </div>

        <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        language="en"
        region="US"
        >
          <Map /> 
        </LoadScript>

        <div className="bg-green-100 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2">Customer Details</h3>
          <p>{pickupDetails.customerName}</p>
          <div className="flex items-center mt-2">
            <Phone className="h-5 w-5 mr-2 text-green-500" />
            <a href={`tel:${pickupDetails.phoneNumber}`} className="text-blue-500 underline">
              {pickupDetails.phoneNumber}
            </a>
          </div>
        </div>

        <Button 
          onClick={handleArrived}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
        >
          I've Arrived
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommuteCargoPickupNavigation;
