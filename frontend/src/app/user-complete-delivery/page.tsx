"use client";
import React, { useState } from 'react';
import { Check, Star, MapPin, Package, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from "next/navigation";
import Popup from '@/components/popup/popup';

const CommuteCargaUserDeliveryRating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  // Mock delivery details
  const deliveryDetails = {
    driverName: 'Tanaka Yuki',
    cargoDescription: 'Medium-sized package',
    deliveryTime: '14:30',
    pickupLocation: '1-1-2 Otemachi, Chiyoda-ku, Tokyo',
    deliveryLocation: '2-1-1 Nihonbashi, Chuo-ku, Tokyo',
  };

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    console.log('Delivery rated:', { rating, comment });
    setShowPopup(true);
  };

  // ポップアップを閉じてページ遷移する関数
  const handleCompleteDelivery = () => {
    setShowPopup(false);
    router.push("/request-delivery");
  };

  return (
    <div>
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
            Your package has been delivered!
          </h3>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              <span className="font-semibold">Driver:</span>
              <span className="ml-2">{deliveryDetails.driverName}</span>
            </div>
            <div className="flex items-center mb-2">
              <Package className="h-5 w-5 mr-2 text-purple-500" />
              <span className="font-semibold">Package:</span>
              <span className="ml-2">{deliveryDetails.cargoDescription}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-500" />
              <span className="font-semibold">Delivered at:</span>
              <span className="ml-2">{deliveryDetails.deliveryTime}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Rate your delivery experience:</h4>
            <div className="flex justify-center mb-4">
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
            <Textarea
              placeholder="Leave a comment about your delivery experience (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-auto"
          >
            Submit Rating
          </Button>
        </CardContent>
      </Card>

      {showPopup && (
        <Popup
          message="Thank you for your rating!"
          onClose={() => setShowPopup(false)}
          onComplete={handleCompleteDelivery}
        />
      )}
    </div>
  );
};

export default CommuteCargaUserDeliveryRating;
