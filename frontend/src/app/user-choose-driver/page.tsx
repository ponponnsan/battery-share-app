"use client";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import DriverCard from './driver-card';


const ChooseDriverList = () => {
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
    if (driverData) {
      setdriverData(driverData);
      console.log('ユーザー情報を取得しました', driverData)
      console.log('ユーザー名', driverData.name) 
    } else {
      console.error("ユーザー情報が見つかりませんでした");
    }
  }, []);


  const getdriverData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('driverData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };


  const drivers = [
    { image:driverData.photo , name: driverData.name, from: driverData.fromLocation, to: driverData.toLocation, startTime: driverData.departureTime, endTime: driverData.arrivalTime, transport: driverData.vehicleType, rating: 3 },
    { image:'' , name: 'Name Name', from: '千葉 Chiba', to: '東京 Tokyo', startTime: '07:10', endTime: '08:10',  transport: 'Car', rating: 2 },
    { image:'' , name: 'Name Name', from: '千葉 Chiba', to: '東京 Tokyo', startTime: '07:00', endTime: '08:00',  transport: 'Car', rating: 1 },
    { image:'' , name: 'Name Name', from: '千葉 Chiba', to: '東京 Tokyo', startTime: '07:30', endTime: '08:30',  transport: 'Car', rating: 3 },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Choose a Driver</h2>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-600 mb-4">Please choose a driver</p>
        {drivers.map((driver, index) => (
          <DriverCard key={index} {...driver} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ChooseDriverList;
