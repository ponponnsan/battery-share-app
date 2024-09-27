import React from 'react';
import { useRouter } from "next/navigation";
import { Check } from 'lucide-react';

interface PopupProps {
  message: string;
  onClose: () => void;
}


const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  const router = useRouter();
  const handleCompleteDelivery = () => {
    console.log('Navigate to User complte delivery screen');
    router.push("/user-complete-delivery");
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-800 rounded-lg p-6 shadow-lg max-w-sm w-full mx-4">
        <h3 className="font-semibold text-lg text-center mb-2">Notification</h3>
        <div className="flex justify-center items-center my-6">
            <div className="bg-green-100 rounded-full p-4">
              <Check className="h-16 w-16 text-green-500" />
            </div>
        </div>
        <p className="text-center">{message}</p>
        <button
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          onClick={handleCompleteDelivery}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;

