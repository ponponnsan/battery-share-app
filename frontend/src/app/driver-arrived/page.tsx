"use client";
import MapComponent from "@/components/maps/open-maps";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, Package, Phone } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const CommuteCargaDeliveryNavigation = () => {
  const [estimatedTime, setEstimatedTime] = useState('25 min');
  const [distance, setDistance] = useState('7.5 km');
  const router = useRouter();
  const [startPoint, setStartPoint] = useState<RoutePoint | null>(null);
  const [endPoint, setEndPoint] = useState<RoutePoint | null>(null);

  const [user, setUser] = useState({ name: '' });
  const [UserPickup, setUserPickup] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    preferredTime: '',
    cargoSize: '',
  });

  useEffect(() => {
    const userPickupData = getUserPickupData();
    const userData = getStoredUserData();
    if (userPickupData && userData) {
      setUserPickup(userPickupData);
      setUser(userData)
      console.log('ユーザー情報を取得しました', userPickupData)
      console.log('ユーザー名', userData.name)
    } else {
      console.error("ユーザー情報が見つかりませんでした");
    }
  }, []);

  useEffect(() => {
    // San Francisco International Airport
    setStartPoint({ lat: 37.6213, lng: -122.3790 });
    // Stanford University
    setEndPoint({ lat: 37.4275, lng: -122.1697 });
  }, []); // 初回レンダリング時のみ実行

  const getStoredUserData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('userData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  const getUserPickupData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('userPickupData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  // Mock delivery details
  const deliveryDetails = {
    phoneNumber: '090-9876-5432',
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
        <h2 className="text-xl font-bold flex-grow">Navigate to Delivery</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="bg-gray-100 rounded-lg p-3 mb-3">
          <h3 className="font-semibold mb-2 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            Delivery Location
          </h3>
          <p>{UserPickup.deliveryLocation}</p>
        </div>

          <MapComponent start={startPoint} end={endPoint} />

        <div className="bg-green-100 rounded-lg p-2 mb-2">
          <h3 className="font-semibold mb-2">Customer Details</h3>
          <p>{user.name}</p>
          <div className="flex items-center mt-2">
            <Phone className="h-5 w-5 mr-2 text-green-500" />
            <a href={`tel:${deliveryDetails.phoneNumber}`} className="text-blue-500 underline">
              {deliveryDetails.phoneNumber}
            </a>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-2 mb-2">
          <h3 className="font-semibold mb-2 flex items-center">
            <Package className="h-5 w-5 mr-2 text-yellow-500" />
            Cargo Details
          </h3>
          <p>{UserPickup.cargoSize}</p>
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
