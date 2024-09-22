import React, { useState } from 'react';
import { MapPin, Clock, Search, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FindDriverForm = () => {
  const [deliveryType, setDeliveryType] = useState('');
  const [needCare, setNeedCare] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [fromTime, setFromTime] = useState('00:00');
  const [toTime, setToTime] = useState('00:00');

  const deliveryTypes = ['Food', 'Liquid', 'Tableware', 'Furniture', 'Cloth', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { deliveryType, needCare, fromLocation, toLocation, fromTime, toTime });
    // Here you would typically send the data to your backend
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <Button variant="ghost" className="mr-2 p-0">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>
        <h2 className="text-xl font-bold">Find a Driver</h2>
        <div className="ml-auto rounded-full bg-gray-200 w-10 h-10 overflow-hidden">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">What do you want to deliver?</p>
            <div className="grid grid-cols-3 gap-2">
              {deliveryTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={deliveryType === type ? 'default' : 'outline'}
                  onClick={() => setDeliveryType(type)}
                  className={`rounded-full ${deliveryType === type ? 'bg-red-500 text-white' : 'border-red-500 text-red-500'}`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-red-500 mb-2">※Need to handle with care?</p>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={needCare ? 'default' : 'outline'}
                onClick={() => setNeedCare(true)}
                className={needCare ? 'bg-red-500 text-white' : 'border-red-500 text-red-500'}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={!needCare ? 'default' : 'outline'}
                onClick={() => setNeedCare(false)}
                className={!needCare ? 'bg-red-500 text-white' : 'border-red-500 text-red-500'}
              >
                No
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Where to where? What time?</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-16 font-bold text-red-500">From</div>
                <div className="flex-grow space-y-2">
                  <Input
                    type="text"
                    placeholder="Where From"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                  <Input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 font-bold text-red-500">To</div>
                <div className="flex-grow space-y-2">
                  <Input
                    type="text"
                    placeholder="Where To"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                  <Input
                    type="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-40 bg-gray-200 rounded-md"></div>

          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FindDriverForm;
