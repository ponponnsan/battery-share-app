import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Car, Clock, MapPin, RotateCcw, Star } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const DriverDetailsView = () => {
  const { state: driver } = useLocation();  // useLocationでドライバーの詳細を受け取る
  const navigate = useNavigate();  // useNavigateフックを使用してナビゲーションを設定

  const handleShareMapClick = () => {
    navigate('/map-view');  // サインアップ画面に遷移
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <ArrowLeft className="h-6 w-6 mr-4" />
        <h2 className="text-xl font-bold flex-grow">Driver Details</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img src="/api/placeholder/128/128" alt={driver.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold">{driver.name}</h3>
        </div>

        <div className="bg-red-50 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            {[...Array(driver.rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-red-500 fill-current mr-1" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-red-500 mr-4" />
            <span>{driver.from}</span>
            <span className="mx-2 text-red-500">▸▸▸</span>
            <span>{driver.to}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-red-500 mr-4" />
            <span>{driver.startTime}</span>
            <span className="mx-2 text-red-500">▸▸▸</span>
            <span>{driver.endTime}</span>
          </div>
          <div className="flex items-center">
            <RotateCcw className="w-6 h-6 text-red-500 mr-4" />
            <span>{driver.frequency}</span>
          </div>
          <div className="flex items-center">
            <Car className="w-6 h-6 text-red-500 mr-4" />
            <span>{driver.transport}</span>
          </div>
        </div>
      </CardContent>
      <div className="p-4">
        <Button 
          type="button"  // 画面遷移の場合は type="button" にする
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          onClick={handleShareMapClick}  // ボタンクリック時に画面遷移を実行
        >
          offer
        </Button>
      </div>
    </Card>
  );
};

export default DriverDetailsView;