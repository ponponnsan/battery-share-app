"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Clock, MapPin, Package, Truck } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';


const CommuteCargaDeliveryRequest = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [cargoSize, setCargoSize] = useState('');
  const router = useRouter();

  const handleRequestDelivery = (e) => {
    e.preventDefault();
    console.log('Delivery Request:', { pickupLocation, deliveryLocation, preferredTime, cargoSize });
    router.push("/user-choose-driver");
  };
  // const handleRequestDelivery = () => {
  //   console.log('Navigate to Request Delivery screen');
  //   // Here you would typically handle navigation to the delivery request screen
  // };

  const handleRegisterAsDriver = () => {
    console.log('Navigate to Driver Registration screen');
    router.push("/register-driver");
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
            <form onSubmit={handleRequestDelivery} className="space-y-4">
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

            <Button 
                onClick={handleRequestDelivery}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg flex items-center justify-center text-lg"
                >
                <Package className="h-8 w-8 mr-4" />
                Request a Delivery
            </Button>
            </form>
        </CardContent>
        <CardContent className="p-4 flex-grow flex flex-col justify-center">
        <Button 
            onClick={handleRegisterAsDriver}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-lg flex items-center justify-center text-lg"
              >
            <Truck className="h-8 w-8 mr-4" />
            Register as a Driver
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDeliveryRequest;



// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Bell, Package, Truck, User } from 'lucide-react';

// const CommuteCargaHomeScreen = () => {
//   const handleRequestDelivery = () => {
//     console.log('Navigate to Request Delivery screen');
//     // Here you would typically handle navigation to the delivery request screen
//   };

//   const handleRegisterAsDriver = () => {
//     console.log('Navigate to Driver Registration screen');
//     // Here you would typically handle navigation to the driver registration screen
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
//       <CardHeader className="bg-red-500 text-white flex items-center justify-between p-4">
//         <h2 className="text-xl font-bold">Commute Cargo</h2>
//         <div className="flex items-center">
//           <Bell className="h-6 w-6 mr-4" />
//           <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
//             <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4 flex-grow flex flex-col justify-center">
//         <div className="space-y-6">
//           <h3 className="text-2xl font-bold text-center mb-8">Welcome to Commute Cargo</h3>
          
//           <Button 
//             onClick={handleRequestDelivery}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-lg flex items-center justify-center text-lg"
//           >
//             <Package className="h-8 w-8 mr-4" />
//             Request a Delivery
//           </Button>

//           <Button 
//             onClick={handleRegisterAsDriver}
//             className="w-full bg-green-500 hover:bg-green-600 text-white py-6 rounded-lg flex items-center justify-center text-lg"
//           >
//             <Truck className="h-8 w-8 mr-4" />
//             Register as a Driver
//           </Button>
//         </div>
//       </CardContent>
//       <div className="p-4 bg-gray-100">
//         <div className="flex justify-around">
//           <Button variant="ghost" className="flex flex-col items-center">
//             <Package className="h-6 w-6 mb-1" />
//             <span>Deliveries</span>
//           </Button>
//           <Button variant="ghost" className="flex flex-col items-center">
//             <Truck className="h-6 w-6 mb-1" />
//             <span>Drive</span>
//           </Button>
//           <Button variant="ghost" className="flex flex-col items-center">
//             <User className="h-6 w-6 mb-1" />
//             <span>Profile</span>
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default CommuteCargaHomeScreen;
