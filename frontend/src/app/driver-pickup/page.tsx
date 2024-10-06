"use client"
import MapComponent from "@/components/maps/open-maps";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MapPin, Phone } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const CommuteCargoPickupNavigation = () => {
  const [estimatedTime, setEstimatedTime] = useState('15 min');
  const [distance, setDistance] = useState('3.2 km');
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

  // ピックアップ詳細のモックデータ
  const pickupDetails = {
    phoneNumber: '(555) 123-4567',
  };

  const handleArrived = () => {
    console.log('Driver has arrived at pickup location');
    router.push("/driver-arrived");
  };

  // 車両のモックデータ
  const vehicles = [
    { lat: 37.6191145, lng: -122.3816274 },
    { lat: 37.42766, lng: -122.17006 },
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
          <p>{UserPickup.pickupLocation}</p>
        </div>

        <MapComponent start={startPoint} end={endPoint} />

        <div className="bg-green-100 rounded-lg p-4 mb-4">
          <h3 className="font-semibold mb-2">Customer Details</h3>
          <p>{user.name}</p>
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
