"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Package, Clock, User, Phone, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Map from "@/components/maps/google-map";

const CommuteCargaUserDeliveryProgress = () => {
  const [status, setStatus] = useState('In Transit');
  const [estimatedArrival, setEstimatedArrival] = useState('15 min');

  // Mock delivery details
  const deliveryDetails = {
    driverName: 'Tanaka Yuki',
    driverPhone: '090-1234-5678',
    cargoDescription: 'Medium-sized package',
    pickupLocation: '1-1-2 Otemachi, Chiyoda-ku, Tokyo',
    deliveryLocation: '2-1-1 Nihonbashi, Chuo-ku, Tokyo',
  };

  // Mock vehicles details
  const vehicles = [
    { lat: 35.6762, lng: 139.6503 },
    { lat: 35.6895, lng: 139.6917 },
  ];

  // Simulating status updates
  useEffect(() => {
    const timer = setInterval(() => {
      setEstimatedArrival((prev) => {
        const minutes = parseInt(prev);
        return minutes > 1 ? `${minutes - 1} min` : 'Arriving';
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleContact = () => {
    console.log('Contacting driver');
    // Here you would typically handle the contact logic
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-blue-500 text-white flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Delivery in Progress</h2>
        <div className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
          {status}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex-grow bg-gray-200 rounded-lg mb-4 relative">
          <Map vehicles={vehicles} />
        </div>

        <div className="bg-blue-100 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              <span className="font-semibold">Estimated Arrival:</span>
            </div>
            <span className="text-lg font-bold">{estimatedArrival}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-500" />
            Driver Information
          </h3>
          <p>{deliveryDetails.driverName}</p>
          <div className="flex mt-2 space-x-2">
            <Button size="sm" variant="outline" onClick={handleContact}>
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button size="sm" variant="outline" onClick={handleContact}>
              <MessageCircle className="h-4 w-4 mr-1" />
              Message
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Package className="h-5 w-5 mr-2 text-purple-500" />
              Package Details
            </h3>
            <p>{deliveryDetails.cargoDescription}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-500" />
              Pickup Location
            </h3>
            <p>{deliveryDetails.pickupLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-500" />
              Delivery Location
            </h3>
            <p>{deliveryDetails.deliveryLocation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaUserDeliveryProgress;
