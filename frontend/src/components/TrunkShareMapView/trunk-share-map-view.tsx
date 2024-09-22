import React from 'react';
import { Menu, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const TrunkShareMapView = () => {
  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <Menu className="h-6 w-6 mr-4" />
        <div className="flex items-center flex-grow">
          <Truck className="h-6 w-6 mr-2" />
          <h2 className="text-xl font-bold">Trunk Share</h2>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Input 
          className="mb-4 border-2 border-red-500 text-2xl font-light" 
          placeholder="Where To ?"
        />
        <div className="flex-grow relative">
          <img 
            src="/api/placeholder/400/600" 
            alt="Map" 
            className="w-full h-full object-cover"
          />
          {/* Placeholder for map icons */}
          <div className="absolute top-1/4 left-1/4 bg-red-500 p-1 rounded">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 bg-red-500 p-1 rounded">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <div className="absolute top-1/2 left-1/2 bg-red-500 p-1 rounded-full">
            <div className="h-4 w-4 bg-white rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrunkShareMapView;
