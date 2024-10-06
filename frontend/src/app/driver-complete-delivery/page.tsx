"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Clock, DollarSign, MapPin, Package, Star } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Connection, Keypair, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import Image from 'next/image';
import solanaImg from './solana.png'; // 画像をインポート

const CommuteCargaDeliveryCompletion = () => {
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const [UserPickup, setUserPickup] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    preferredTime: '',
    cargoSize: '',
  });

  useEffect(() => {
    const userPickupData = getUserPickupData();
    if (userPickupData) {
      setUserPickup(userPickupData);
      console.log('ユーザー情報を取得しました', userPickupData)
    } else {
      console.error("ユーザー情報が見つかりませんでした");
    }
  }, []);


  const getUserPickupData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('userPickupData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };

  // Mock delivery details
  const deliveryDetails = {
    address: '2-1-1 Nihonbashi, Chuo-ku, Tokyo',
    recipientName: 'Sato Hana',
    cargoDescription: 'Medium-sized package',
    deliveryTime: '14:30',
    earnings: '0.1 SOL',
  };

  const handleRating = (value) => {
    setRating(value);
  };

  const handleComplete = async () => {
    console.log('Delivery completed with rating:', rating);

    try {
      const amount = 0.1; // 0.1 SOL の例
      // 1. Solana の設定
      const SOLANA_RPC_URL = "https://api.testnet.solana.com";
      const secretKeyString = '[214,244,100,171,244,109,243,78,137,223,78,61,39,196,184,130,224,105,182,137,128,126,92,79,9,96,238,69,178,89,228,211,36,119,237,174,158,12,250,83,141,120,18,29,109,185,252,30,216,4,224,139,243,119,99,213,33,199,32,116,12,177,0,67]'; // TODO: 本来は環境変数などで管理
      const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
      // 2. Keypairオブジェクトを作成
      const payer = Keypair.fromSecretKey(secretKey);
      // 管理側のアドレスを取得
      const AGENT_ADDRESS = '644upe4XFz1iWbbSGbRvqk6UcR7GFQDgJCVkVWjf9oF4';

      const connection = new Connection(SOLANA_RPC_URL, "confirmed");
      const recipientPublicKey = new PublicKey(AGENT_ADDRESS);
      const lamports = Math.floor(amount * 1e9); // SOLをlamportsに変換 (1 SOL = 1e9 lamports)

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: payer.publicKey,
          toPubkey: recipientPublicKey,
          lamports,
        })
      );

      // トランザクションに署名して送信
      const signature = await connection.sendTransaction(transaction, [payer]);

      // トランザクションの確認を待つ
      const confirmation = await connection.confirmTransaction(signature);

      if (confirmation.value.err) {
        // トランザクションが失敗した場合
        console.error('Error:', confirmation.value.err);
        return;
      }

      // トランザクションの詳細を取得
      const txInfo = await connection.getTransaction(signature, { commitment: "confirmed" });
      console.log('Transaction Signatures> [', txInfo?.transaction.signatures ,']');
    } catch (error) {
      console.error('Error:', error);
      console.error('Error:', (error as Error).message);
    }

    router.push("/confirm-registration");
  };

  return (
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
          Great job! Delivery successful!
        </h3>

        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 mr-2 text-red-500" />
            <span className="font-semibold">Delivered to:</span>
          </div>
          <p>{UserPickup.deliveryLocation}</p>
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-500" />
            <span>{UserPickup.cargoSize}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-500" />
            <span>{deliveryDetails.deliveryTime}</span>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Earnings:</span>
            <div className="flex items-center">
              <Image src={solanaImg} alt="Solana Logo" width={24} height={24} className="mr-2" />
              <span className="text-xl font-bold">{deliveryDetails.earnings}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Rate your experience:</h4>
          <div className="flex justify-center">
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
        </div>

        <Button 
          onClick={handleComplete}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg mt-auto"
        >
          Complete
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaDeliveryCompletion;
