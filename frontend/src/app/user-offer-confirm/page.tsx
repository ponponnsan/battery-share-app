"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Clock, MapPin, Package, User } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const CommuteCargaOfferAcceptedScreen = () => {
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


  const handleConfirm = () => {
    console.log('Confirmation acknowledged');
    router.push("/user-delivery-progress");
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Offer Confirm</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src={user.image || "/api/placeholder/40/40"} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="mb-4">
          <p className="font-semibold">{user.name || 'User'}</p>
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
            <p className="ml-7">{driverData.name}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-3 w-5 mr-2 text-red-500" />
              Pickup Location
            </h3>
            <p className="ml-7">{driverData.fromLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-3 w-5 mr-2 text-green-500" />
              Delivery Location
            </h3>
            <p className="ml-7">{driverData.toLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <Clock className="h- w-5 mr-2 text-blue-500" />
              Preferred Time
            </h3>
            <p className="ml-7">{driverData.arrivalTime}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <Package className="h-5 w-5 mr-2 text-purple-500" />
              Cargo Size
            </h3>
            <p className="ml-7">{driverData.cargoSpace}</p>
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
