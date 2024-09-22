import React, { useState } from 'react';
import { Check, Star, MapPin, Package, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CommuteCargaDeliveryCompletion = () => {
  const [rating, setRating] = useState(0);

  // Mock delivery details
  const deliveryDetails = {
    address: '2-1-1 Nihonbashi, Chuo-ku, Tokyo',
    recipientName: 'Sato Hana',
    cargoDescription: 'Medium-sized package',
    deliveryTime: '14:30',
    earnings: '¥1,500',
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleComplete = () => {
    console.log('Delivery completed with rating:', rating);
    // Here you would typically handle the completion logic
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-green-500 text-white flex items-center justify-center p-4">
        <h2 className="text-xl font-bold">Delivery Completed</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex justify-center items-center my-6">
          <div className="bg-green-100 rounded-full p-4">
            <Check className="h-16 w-16 text-green-500" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-center mb-6">
          Great job! Delivery successful.
        </h3>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            <span className="font-semibold">Delivered to:</span>
          </div>
          <p>{deliveryDetails.address}</p>
          <p>{deliveryDetails.recipientName}</p>
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-500" />
            <span>{deliveryDetails.cargoDescription}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-500" />
            <span>{deliveryDetails.deliveryTime}</span>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Earnings:</span>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-1 text-yellow-500" />
              <span className="text-xl font-bold">{deliveryDetails.earnings}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Rate your experience:</h4>
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                className={`h-8 w-8 cursor-pointer ${
                  value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                onClick={() => handleRating(value)}
              />
            ))}
          </div>
        </div>

        <Button 
          onClick={handleComplete}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-auto"
        >
          Complete
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDeliveryCompletion;
