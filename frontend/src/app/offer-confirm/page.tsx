"use client";
import React from 'react';
import { ArrowLeft, MapPin, Clock, Package, Check, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

const CommuteCargaOfferAcceptedScreen = () => {
  // Mock data for the accepted delivery request
  const deliveryRequest = {
    pickupLocation: "Tokyo Station",
    deliveryLocation: "Shibuya Station",
    preferredTime: "18:00",
    cargoSize: "Medium",
    driverName: "Tanaka Yuki",
  };
  const router = useRouter();


  const handleConfirm = () => {
    console.log('Confirmation acknowledged');
    router.push("/user-delivery-progress");
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <ArrowLeft className="h-6 w-6 mr-4" />
        <h2 className="text-xl font-bold flex-grow">Offer Confirm</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="bg-green-100 rounded-lg p-4 mb-6 flex items-center">
          <Check className="h-8 w-8 text-green-500 mr-3" />
          <p className="text-green-700 font-semibold">Your delivery request has been accepted!</p>
        </div>

        <div className="space-y-6 mb-6">
          <div>
            <h3 className="font-semibold flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Driver
            </h3>
            <p className="ml-7">{deliveryRequest.driverName}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-3 w-5 mr-2 text-red-500" />
              Pickup Location
            </h3>
            <p className="ml-7">{deliveryRequest.pickupLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-3 w-5 mr-2 text-green-500" />
              Delivery Location
            </h3>
            <p className="ml-7">{deliveryRequest.deliveryLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <Clock className="h- w-5 mr-2 text-blue-500" />
              Preferred Time
            </h3>
            <p className="ml-7">{deliveryRequest.preferredTime}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <Package className="h-5 w-5 mr-2 text-purple-500" />
              Cargo Size
            </h3>
            <p className="ml-7">{deliveryRequest.cargoSize}</p>
          </div>
        </div>

        <div className="mt-auto">
          <Button 
            onClick={handleConfirm}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <Check className="h-5 w-5 mr-2" />
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaOfferAcceptedScreen;
