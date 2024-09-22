import React from 'react';
import { ArrowLeft, User, MapPin, Clock, Car, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CommuteCargaDriverRegistrationConfirmation = () => {
  // In a real app, this data would come from the previous form or global state
  const driverInfo = {
    photo: '/api/placeholder/128/128',
    name: 'Tanaka Yuki',
    introduction: 'Reliable driver with 5 years of experience in delivery services.',
    fromLocation: 'Shibuya Station',
    toLocation: 'Shinjuku Station',
    departureTime: '07:00',
    arrivalTime: '08:00',
    vehicleType: 'Sedan',
    cargoSpace: '100x50x50 cm',
  };

  const handleEdit = () => {
    console.log('Edit registration');
    // Here you would typically navigate back to the registration form
  };

  const handleConfirm = () => {
    console.log('Confirm registration');
    // Here you would typically submit the registration data to your backend
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <ArrowLeft className="h-6 w-6 mr-4" />
        <h2 className="text-xl font-bold flex-grow">Confirm Registration</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-2">
            <img src={driverInfo.photo} alt="Driver" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold">{driverInfo.name}</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Introduction
            </h4>
            <p className="ml-7">{driverInfo.introduction}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-500" />
              Commute Route
            </h4>
            <p className="ml-7">From: {driverInfo.fromLocation}</p>
            <p className="ml-7">To: {driverInfo.toLocation}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-500" />
              Commute Time
            </h4>
            <p className="ml-7">Departure: {driverInfo.departureTime}</p>
            <p className="ml-7">Arrival: {driverInfo.arrivalTime}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <Car className="h-5 w-5 mr-2 text-purple-500" />
              Vehicle Type
            </h4>
            <p className="ml-7">{driverInfo.vehicleType}</p>
          </div>

          <div>
            <h4 className="font-semibold flex items-center">
              <Package className="h-5 w-5 mr-2 text-yellow-500" />
              Cargo Space
            </h4>
            <p className="ml-7">{driverInfo.cargoSpace}</p>
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
