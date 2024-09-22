import { Button } from '@/components/ui/button';
import { ChevronLeft, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useNavigate } from 'react-router-dom';

const CommuteForm = () => {
  const navigate = useNavigate();  // useNavigateフックを使用してナビゲーションを設定

  const handleChooseDriverclick = () => {
    navigate('/choose-driver');  // サインアップ画面に遷移
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-red-400 text-white p-4 flex items-center">
        <ChevronLeft className="mr-2" />
        <h1 className="text-xl font-bold flex-grow">Commuting Route</h1>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 mb-4">Where to where? What time?</p>

        <div className="space-y-4">
          {['From', 'To'].map((label) => (
            <div key={label} className="flex">
              <div className="w-1/4 bg-red-400 text-white p-2 flex items-center justify-center rounded-l">
                {label}
              </div>
              <div className="w-3/4 border border-gray-300 rounded-r">
                <div className="flex items-center border-b border-gray-300">
                  <MapPin className="text-gray-400 m-2" />
                  <input className="p-2 w-full outline-none" placeholder={`Where ${label.toLowerCase()}`} />
                </div>
                <div className="flex items-center">
                  <Clock className="text-gray-400 m-2" />
                  <input className="p-2 w-full outline-none" type="time" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 mt-4 mb-2">By what?</p>
        <div className="flex space-x-2 mb-4">
          {['Car', 'Motorcycle', 'Bicycle'].map((mode) => (
            <button key={mode} className="flex-1 py-2 px-4 bg-white border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-white transition-colors">
              {mode}
            </button>
          ))}
        </div>

        <p className="text-gray-600 mb-2">How often?</p>
        <div className="flex space-x-2 mb-4">
          {['Weekdays', 'Holidays', 'Other'].map((frequency) => (
            <button key={frequency} className="flex-1 py-2 px-4 bg-white border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-white transition-colors">
              {frequency}
            </button>
          ))}
        </div>

        <div className="relative w-full h-48 mb-4">
          <Image
            src="/api/placeholder/400/200"
            alt="Map placeholder"
            layout="fill"
            objectFit="cover"
            className="rounded"
          />
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-red-500 rounded-full border-4 border-white"></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-red-500 rounded-full border-4 border-white"></div>
        </div>
        <Button 
          type="button"  // 画面遷移の場合は type="button" にする
          className="w-full bg-red-500 hover:bg-red-600 text-white"
          onClick={handleChooseDriverclick}  // ボタンクリック時に画面遷移を実行
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default CommuteForm;
