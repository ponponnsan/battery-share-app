"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Car, Clock, MapPin, Package, User } from 'lucide-react';

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

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { ArrowLeft, Clock, MapPin, Navigation, Package, Phone } from 'lucide-react';
// import { useRouter } from "next/navigation";
// import { useState } from 'react';

// const CommuteCargaDeliveryNavigation = () => {
//   const [estimatedTime, setEstimatedTime] = useState('25 min');
//   const [distance, setDistance] = useState('7.5 km');
//   const router = useRouter();

//   // Mock delivery details
//   const deliveryDetails = {
//     address: '2-1-1 Nihonbashi, Chuo-ku, Tokyo',
//     recipientName: 'Sato Hana',
//     phoneNumber: '090-9876-5432',
//     cargoDescription: 'Medium-sized package, handle with care',
//   };

//   const handleDelivered = () => {
//     console.log('Cargo delivered successfully');
//     // Here you would typically handle the delivery completion logic
//     router.push("/wait-delivery");
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
//       <CardHeader className="bg-red-500 text-white flex items-center p-4">
//         <ArrowLeft className="h-6 w-6 mr-4" />
//         <h2 className="text-xl font-bold flex-grow">Navigate to Delivery</h2>
//       </CardHeader>
//       <CardContent className="p-4 flex-grow flex flex-col">
//         <div className="bg-gray-100 rounded-lg p-4 mb-4">
//           <h3 className="font-semibold mb-2 flex items-center">
//             <MapPin className="h-5 w-5 mr-2 text-red-500" />
//             Delivery Location
//           </h3>
//           <p>{deliveryDetails.address}</p>
//         </div>

//         <div className="flex-grow bg-gray-200 rounded-lg mb-4 relative">
//           {/* This would be replaced with an actual map component */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-gray-500">Map View</p>
//           </div>
//         </div>

//         <div className="bg-blue-100 rounded-lg p-4 mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <div className="flex items-center">
//               <Navigation className="h-5 w-5 mr-2 text-blue-500" />
//               <span className="font-semibold">Distance</span>
//             </div>
//             <span>{distance}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <Clock className="h-5 w-5 mr-2 text-blue-500" />
//               <span className="font-semibold">ETA</span>
//             </div>
//             <span>{estimatedTime}</span>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded-lg p-4 mb-4">
//           <h3 className="font-semibold mb-2">Recipient Details</h3>
//           <p>{deliveryDetails.recipientName}</p>
//           <div className="flex items-center mt-2">
//             <Phone className="h-5 w-5 mr-2 text-green-500" />
//             <a href={`tel:${deliveryDetails.phoneNumber}`} className="text-blue-500 underline">
//               {deliveryDetails.phoneNumber}
//             </a>
//           </div>
//         </div>

//         <div className="bg-yellow-100 rounded-lg p-4 mb-4">
//           <h3 className="font-semibold mb-2 flex items-center">
//             <Package className="h-5 w-5 mr-2 text-yellow-500" />
//             Cargo Details
//           </h3>
//           <p>{deliveryDetails.cargoDescription}</p>
//         </div>

//         <Button 
//           onClick={handleDelivered}
//           className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
//         >
//           Confirm Delivery
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default CommuteCargaDeliveryNavigation;
