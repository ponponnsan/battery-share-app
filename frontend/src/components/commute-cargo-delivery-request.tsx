import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CommuteCargaDeliveryRequest = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [cargoSize, setCargoSize] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Delivery Request:', { pickupLocation, deliveryLocation, preferredTime, cargoSize });
    // Here you would typically handle the request submission logic
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <ArrowLeft className="h-6 w-6 mr-4" />
        <h2 className="text-xl font-bold flex-grow">Request Delivery</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Pickup Location</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter pickup address"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Delivery Location</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter delivery address"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Preferred Time</h3>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Cargo Size</h3>
            <div className="relative">
              <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Select onValueChange={setCargoSize}>
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Select cargo size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (e.g., envelope, small box)</SelectItem>
                  <SelectItem value="medium">Medium (e.g., backpack, medium box)</SelectItem>
                  <SelectItem value="large">Large (e.g., suitcase, large box)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white mt-4">
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDeliveryRequest;
