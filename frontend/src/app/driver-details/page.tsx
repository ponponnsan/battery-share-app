"use client";  // Next.jsでクライアントコンポーネントを明示

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Car, Clock, MapPin, RotateCcw, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; // クエリパラメータ取得用
import { useEffect, useState } from 'react';

const DriverDetailsView = () => {
  const searchParams = useSearchParams();  // クエリパラメータ取得
  const router = useRouter();
  const [user, setUser] = useState({ name: '', image:'' });
  const [driverData, setdriverData] = useState({   
    photo: '',
    name: '',
    introduction: '',
    fromLocation: '',
    toLocation: '',
    departureTime: '',
    arrivalTime: '',
    vehicleType: '',
    cargoSpace:'' 
  });

  useEffect(() => {
    const driverData = getdriverData();
    const userData = getStoredUserData();
    if (driverData  && userData) {
      setdriverData(driverData);
      setUser(userData)
      console.log('ドライバー情報を取得しました', driverData)
      console.log('ユーザー名', userData.name) 
    } else {
      console.error("ユーザー情報が見つかりませんでした");
    }
  }, []);

  const getStoredUserData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('userData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  const getdriverData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('driverData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };
    
  // クエリパラメータからドライバーの詳細を取得
  const driver = {
    name: searchParams.get('name') || 'Driver Name',
    rating: Number(searchParams.get('rating')) || 5,
    from: searchParams.get('from') || 'Start Location',
    to: searchParams.get('to') || 'Destination',
    startTime: searchParams.get('startTime') || '08:00 AM',
    endTime: searchParams.get('endTime') || '09:00 AM',
    frequency: searchParams.get('frequency') || 'Daily',
    transport: searchParams.get('transport') || 'Car',
  };

  // ボタンクリックで画面遷移を実行
  const handleOfferClick = () => {
    console.log('Navigate to User offer confirm screen');
    router.push("/user-offer-confirm");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Driver Details</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src={user.image || "/api/placeholder/40/40"} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="mb-4">
          <p className="font-semibold">{user.name || 'User'}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img src="/api/placeholder/128/128" alt={driverData.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold">{driverData.name}</h3>
        </div>

        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            {[...Array(driver.rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-red-500 fill-current mr-1" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-red-500 mr-4" />
            <span>{driverData.fromLocation}</span>
            <span className="mx-2 text-red-500">▸▸▸</span>
            <span>{driverData.toLocation}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-red-500 mr-4" />
            <span>{driverData.departureTime}</span>
            <span className="mx-2 text-red-500">▸▸▸</span>
            <span>{driverData.arrivalTime}</span>
          </div>
          <div className="flex items-center">
            <RotateCcw className="w-6 h-6 text-red-500 mr-4" />
            <span>{driver.frequency}</span>
          </div>
          <div className="flex items-center">
            <Car className="w-6 h-6 text-red-500 mr-4" />
            <span>{driverData.vehicleType}</span>
          </div>
        </div>
      </CardContent>
      <div className="p-4">
        <Button 
          type="button"
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          onClick={handleOfferClick}
        >
          offer
        </Button>
      </div>
    </Card>
  );
};

export default DriverDetailsView;
