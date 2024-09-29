"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Clock, MapPin, Package, Truck } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
// import { Bell, Package, Truck, User } from 'lucide-react';

const CommuteCargaDeliveryRequest = () => {
    const [pickupLocation, setPickupLocation] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [cargoSize, setCargoSize] = useState('');
    const [user, setUser] = useState({ name: '', image: '' });
    const router = useRouter();

    useEffect(() => {
      const userData = getStoredUserData();
      if (userData && userData.id) {
        fetchUserProfile(userData.id);
        console.log('ユーザー情報を取得しました', userData)
      } else {
        console.error("ユーザー情報が見つかりませんでした");
      }
    }, []);

    const getStoredUserData = () => {
      if (typeof window !== 'undefined') {
        const storedData = localStorage.getItem('userData');
        return storedData ? JSON.parse(storedData) : null;
      }
      return null;
    };
    
  
    const handleRequestDelivery = (e) => {
      e.preventDefault();
      console.log('Delivery Request:', { pickupLocation, deliveryLocation, preferredTime, cargoSize });
      router.push("/user-choose-driver");
    };
  
    const handleRegisterAsDriver = () => {
      console.log('Navigate to Driver Registration screen');
      router.push("/register-driver");
    };

    const fetchUserProfile = async (userId) => {
        try {
          const response = await fetch(`http://127.0.0.1:3001/api/user/profile?id=${userId}`);
          const data = await response.json();
          console.log(data)
          setUser(data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
    };
  
    return (
      <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
        <CardHeader className="bg-red-500 text-white flex items-center p-4">
          <ArrowLeft className="h-6 w-6 mr-4" />
          <h2 className="text-xl font-bold flex-grow">Request Delivery</h2>
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <img src={user.image || "/api/placeholder/40/40"} alt="Profile" className="w-full h-full object-cover" />
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

