"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Car, Clock, MapPin, Package, Upload, User } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useState } from 'react';

const CommuteCargaFullDriverRegistration = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [cargoSpace, setCargoSpace] = useState('');
  const router = useRouter();

  const handleCommuteFormClick = () => {
    console.log('Navigate to Driver confirm screen');
    router.push("/confirm-registration");
  };


  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Driver Registration:', { photo, name, introduction, fromLocation, toLocation, departureTime, arrivalTime, vehicleType, cargoSpace });
    // Here you would typically handle the registration logic
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Driver Registration</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-2">
              {photo ? (
                <img src={photo} alt="Driver" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="flex items-center text-sm text-blue-500">
                <Upload className="h-4 w-4 mr-1" />
                Upload Photo
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
            />
          </div>

          <Textarea
            placeholder="Self Introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            rows={4}
          />

          <div className="space-y-2">
            <h3 className="font-semibold">Commute Route</h3>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="From Location"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="To Location"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Commute Time</h3>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative flex-1">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="time"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Vehicle Information</h3>
            <div className="relative">
              <Car className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Select onValueChange={setVehicleType}>
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Select Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="minivan">Minivan</SelectItem>
                  <SelectItem value="wagon">Station Wagon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Cargo Space</h3>
            <div className="relative">
              <Package className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Cargo Space Size (e.g., 100x50x50 cm)"
                value={cargoSpace}
                onChange={(e) => setCargoSpace(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button 
                type="button"  // 画面遷移の場合は type="button" にする
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={handleCommuteFormClick}  // ボタンクリック時に画面遷移を実行
              >
                Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaFullDriverRegistration;
