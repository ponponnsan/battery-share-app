import { Car, Clock, MapPin, RotateCcw, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/navigation";

const DriverCard = ({ name, from, to, startTime, endTime, frequency, transport, rating }) => {
  const router = useRouter();

  const handleClick = () => {
    // ドライバーの詳細ページにデータを渡しつつ遷移
    router.push('/driver-details', { state: { name, from, to, startTime, endTime, frequency, transport, rating } });
  };

  return (
    <div className="bg-red-50 rounded-lg p-4 mb-2 cursor-pointer" onClick={handleClick}>
      <div className="flex items-center mb-2">
        <div className="w-12 h-12 bg-red-300 rounded-full mr-4"></div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <div className="flex items-center text-red-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{from}</span>
            <span className="mx-2">▸▸▸</span>
            <span>{to}</span>
          </div>
          <div className="flex items-center text-red-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{startTime}</span>
            <span className="mx-2">▸▸▸</span>
            <span>{endTime}</span>
          </div>
          <div className="flex items-center text-red-500">
            <RotateCcw className="w-4 h-4 mr-1" />
            <span>{frequency}</span>
            <Car className="w-4 h-4 mx-2" />
            <span>{transport}</span>
          </div>
        </div>
      </div>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DriverCard;
