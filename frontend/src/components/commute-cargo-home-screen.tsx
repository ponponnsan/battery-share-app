import React from 'react';
import { Package, Truck, User, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CommuteCargaHomeScreen = () => {
  const handleRequestDelivery = () => {
    console.log('Navigate to Request Delivery screen');
    // Here you would typically handle navigation to the delivery request screen
  };

  const handleRegisterAsDriver = () => {
    console.log('Navigate to Driver Registration screen');
    // Here you would typically handle navigation to the driver registration screen
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Commute Cargo</h2>
        <div className="flex items-center">
          <Bell className="h-6 w-6 mr-4" />
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-center mb-8">Welcome to Commute Cargo</h3>
          
          <Button 
            onClick={handleRequestDelivery}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg flex items-center justify-center text-lg"
          >
            <Package className="h-8 w-8 mr-4" />
            Request a Delivery
          </Button>

          <Button 
            onClick={handleRegisterAsDriver}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-lg flex items-center justify-center text-lg"
          >
            <Truck className="h-8 w-8 mr-4" />
            Register as a Driver
          </Button>
        </div>
      </CardContent>
      <div className="p-4 bg-gray-100">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center">
            <Package className="h-6 w-6 mb-1" />
            <span>Deliveries</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <Truck className="h-6 w-6 mb-1" />
            <span>Drive</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center">
            <User className="h-6 w-6 mb-1" />
            <span>Profile</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CommuteCargaHomeScreen;
