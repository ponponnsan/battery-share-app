"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Check, Clock, MapPin, Package, X } from 'lucide-react';
import { useRouter } from "next/navigation";

const CommuteCargaDriverOfferScreen = () => {
  // Mock data for the delivery request
  const deliveryRequest = {
    pickupLocation: "Tokyo Station",
    deliveryLocation: "Shibuya Station",
    preferredTime: "18:00",
    cargoSize: "Medium",
  };
  const router = useRouter();

  const handleAccept = () => {
    console.log('Offer accepted');
    router.push("/pickup"); 

  };

  const handleDecline = () => {
    console.log('Offer declined');
    router.push("/wait-delivery");
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <ArrowLeft className="h-6 w-6 mr-4" />
        <h2 className="text-xl font-bold flex-grow">Delivery Offer</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="space-y-6 mb-6">
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-500" />
              Pickup Location
            </h3>
            <p className="ml-7">{deliveryRequest.pickupLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-500" />
              Delivery Location
            </h3>
            <p className="ml-7">{deliveryRequest.deliveryLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
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

        <div className="mt-auto space-y-4">
          <Button 
            onClick={handleAccept}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <Check className="h-5 w-5 mr-2" />
            Accept Offer
          </Button>
          <Button 
            onClick={handleDecline}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <X className="h-5 w-5 mr-2" />
            Decline Offer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDriverOfferScreen;
