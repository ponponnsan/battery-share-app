"use client";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import DriverCard from './driver-card';


const ChooseDriverList = () => {
  const drivers = [
    { name: 'Name Name', from: '千葉 Chiba', to: '東京 Tokyo', startTime: '07:00', endTime: '08:00', frequency: 'Weekdays', transport: 'Car', rating: 3 },
    { name: 'Name Name', from: '千葉 Chiba', to: '東京 Tokyo', startTime: '07:10', endTime: '08:10', frequency: 'Weekdays', transport: 'Car', rating: 2 },
    { name: 'Name Name', from: '千葉 Chiba', to: '東京 Tokyo', startTime: '07:00', endTime: '08:00', frequency: 'Weekdays', transport: 'Car', rating: 1 },
    { name: 'Name Name', from: '千葉 Chiba', to: '東京 Tokyo', startTime: '07:30', endTime: '08:30', frequency: 'Weekdays', transport: 'Car', rating: 3 },
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
