"use client";
import Map from "@/components/maps/google-map";
import Popup from '@/components/popup/popup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoadScript } from '@react-google-maps/api';
import { MapPin, MessageCircle, Package, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const CommuteCargaUserDeliveryProgress = () => {
  const [status, setStatus] = useState('In Transit');
  const [estimatedArrival, setEstimatedArrival] = useState('15 min');
  const [showPopup, setShowPopup] = useState(false);

  // Mock delivery details
  const deliveryDetails = {
    driverName: 'Tanaka Yuki',
    driverPhone: '090-1234-5678',
    cargoDescription: 'Medium-sized package',
    pickupLocation: '1-1-2 Otemachi, Chiyoda-ku, Tokyo',
    deliveryLocation: '2-1-1 Nihonbashi, Chuo-ku, Tokyo',
  };

  // Mock vehicles details
  // const vehicles = [
  //   { lat: 35.6762, lng: 139.6503 },
  //   { lat: 35.6895, lng: 139.6917 },
  // ];

  // Simulating status updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // 3秒後にポップアップを表示

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setEstimatedArrival((prev) => {
  //       const minutes = parseInt(prev);
  //       return minutes > 1 ? `${minutes - 1} min` : 'Arriving';
  //     });
  //   }, 60000); // Update every minute

  //   return () => clearInterval(timer);
  // }, []);

  const handleContact = () => {
    console.log('Contacting driver');
    // Here you would typically handle the contact logic
  };

  return (
<div>
      <Card className="w-full max-w-md mx-auto h-screen flex flex-col relative"> {/* relativeを追加 */}
        <CardHeader className="bg-blue-500 text-white flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Delivery in Progress</h2>
          <div className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
            {status}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            language="en"
            region="US"
          >
            <Map />
          </LoadScript>

          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Driver Information
            </h3>
            {deliveryDetails ? (
              <>
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
              </>
            ) : (
              <p>Loading driver information...</p>
            )}
          </div>

          <div className="space-y-4">
            {deliveryDetails ? (
              <>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-purple-500" />
                    Package Details
                  </h3>
                  <p>{deliveryDetails.cargoDescription}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-500" />
                    Delivery Location
                  </h3>
                  <p>{deliveryDetails.deliveryLocation}</p>
                </div>
              </>
            ) : (
              <p>Loading package details...</p>
            )}
          </div>
        </CardContent>
      </Card>

      {showPopup && (
        <Popup message="Delivery is complete!" onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default CommuteCargaUserDeliveryProgress;
