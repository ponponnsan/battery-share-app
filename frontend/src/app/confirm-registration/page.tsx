"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Car, Clock, MapPin, Package, User } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const CommuteCargaDriverRegistrationConfirmation = () => {
  const router = useRouter();
  const [DriverInfo, setDriverInfo] = useState({   
      photo: '',
      name: '',
      introduction: '',
      fromLocation: '',
      toLocation: '',
      departureTime: '',
      arrivalTime: '',
      vehicleType: '',
      cargoSpace: '', });


  useEffect(() => {
    const driverData = getStoredDriverData();
    if (driverData) {
      setDriverInfo(driverData);
      console.log('ユーザー情報を取得しました', driverData)
    } else {
      console.error("ユーザー情報が見つかりませんでした");
    }
  }, []);

  const getStoredDriverData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('driverData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  const handleEdit = () => {
    console.log('Edit registration');
    router.push("/driver-registration");
  };

  const handleConfirm = () => {
    console.log('Confirm registration');
    router.push("/driver-offer-delivery");
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Confirm Registration</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-2">
            <img src={DriverInfo.photo} alt="Driver" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold">{DriverInfo.name}</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Introduction
            </h4>
            <p className="ml-7">{DriverInfo.introduction}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-500" />
              Commute Route
            </h4>
            <p className="ml-7">From: {DriverInfo.fromLocation}</p>
            <p className="ml-7">To: {DriverInfo.toLocation}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-500" />
              Commute Time
            </h4>
            <p className="ml-7">Departure: {DriverInfo.departureTime}</p>
            <p className="ml-7">Arrival: {DriverInfo.arrivalTime}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <Car className="h-5 w-5 mr-2 text-purple-500" />
              Vehicle Type
            </h4>
            <p className="ml-7">{DriverInfo.vehicleType}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <Package className="h-5 w-5 mr-2 text-yellow-500" />
              Cargo Space
            </h4>
            <p className="ml-7">{DriverInfo.cargoSpace}</p>
          </div>
        </div>

        <div className="flex space-x-4 mt-auto">
          <Button onClick={handleEdit} className="flex-1 bg-gray-500 hover:bg-gray-600 text-white">
            Edit
          </Button>
          <Button onClick={handleConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white">
            Confirm
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDriverRegistrationConfirmation;
