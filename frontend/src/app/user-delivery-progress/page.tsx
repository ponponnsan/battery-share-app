"use client";
import MapComponent from "@/components/maps/open-maps";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { LoadScript } from '@react-google-maps/api';
import { RoutePoint } from '@/types';
import { MapPin, MessageCircle, Package, Phone, User } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';


const CommuteCargaUserDeliveryProgress = () => {
  const router = useRouter();
  const [status, setStatus] = useState('In Transit');
  const [estimatedArrival, setEstimatedArrival] = useState('15 min');
  const [startPoint, setStartPoint] = useState<RoutePoint | null>(null);
  const [endPoint, setEndPoint] = useState<RoutePoint | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  const [DriverInfo, setDriverInfo] = useState({   
    photo: '',
    name: '',
    introduction: '',
    fromLocation: '',
    toLocation: '',
    departureTime: '',
    arrivalTime: '',
    vehicleType: '',
    cargoSpace: '', });

//   // const DynamicMapComponent = dynamic(() => import('@/components/maps/open-maps'), {
//   //   ssr: false, // サーバーサイドレンダリングを無効にする
//   // });

  useEffect(() => {
    const driverData = getStoredDriverData();
    if (driverData) {
      setDriverInfo(driverData);
      console.log('ドライバー情報を取得しました', driverData)
    } else {
      console.error("ユーザー情報が見つかりませんでした");
    }
  }, []);

  const getStoredDriverData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('driverData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  useEffect(() => {
    // nagoya
    setStartPoint({ lat: 35.18028, lng: 136.90667 });
    // tokyo
    setEndPoint({ lat: 35.68944, lng: 139.69167 });
  }, []); // 初回レンダリング時のみ実行

//   // Mock vehicles details
//   // const vehicles = [
//   //   { lat: 35.6762, lng: 139.6503 },
//   //   { lat: 35.6895, lng: 139.6917 },
//   // ];

  // Simulating status updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000); // 3秒後にポップアップを表示

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // ページ遷移を処理する関数
  const handleCompleteDelivery = () => {
    console.log('Navigating to User complete delivery screen');
    router.push("/user-complete-delivery");
  };

  const handleContact = () => {
    console.log('Contacting driver');
    // ここで通常は連絡処理を行います
  };

  return (
    <div>
      <Card className="w-full max-w-md mx-auto h-screen flex flex-col relative"> {/* relativeを追加 */}
        <CardHeader className="bg-blue-500 text-white flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Delivery in Progress</h2>
          <div className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
            {status}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          {/* <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            language="en"
            region="US"
          > */}
          <MapComponent start={startPoint} end={endPoint} />
          {/* </LoadScript */}

          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="font-semibold mb-2 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Driver Information
            </h3>
            {DriverInfo ? (
              <>
                <p>{DriverInfo.name}</p>
                <div className="flex mt-2 space-x-2">
                  <Button size="sm" variant="outline" onClick={handleContact}>
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleContact}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </>
            ) : (
              <p>Loading driver information...</p>
            )}
          </div>

          <div className="space-y-4">
            {DriverInfo ? (
              <>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-purple-500" />
                    Package Details
                  </h3>
                  <p>{DriverInfo.cargoSpace}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-green-500" />
                    Delivery Location
                  </h3>
                  <p>{DriverInfo.fromLocation}</p>
                </div>
              </>
            ) : (
              <p>Loading package details...</p>
            )}
          </div>
        </CardContent>
      </Card>

       {/* {showPopup && (
         <Popup
           message="Delivery is complete!"
           onClose={handleClosePopup}
           onComplete={handleCompleteDelivery}
         />
       )} */}
     </div>
  );
};

export default CommuteCargaUserDeliveryProgress;
