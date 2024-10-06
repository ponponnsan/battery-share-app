"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check, Clock, MapPin, Package, User } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Connection, Keypair, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';

const CommuteCargaOfferAcceptedScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: '', image:'' });
  const [driverData, setDriverData] = useState({
    photo: '',
    name: '',
    introduction: '',
    fromLocation: '',
    toLocation: '',
    departureTime: '',
    arrivalTime: '',
    vehicleType: '',
    cargoSpace: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const driverData = getDriverData();
    const userData = getStoredUserData();
    if (driverData  && userData) {
      setDriverData(driverData);
      setUser(userData)
      console.log('ドライバー情報を取得しました', driverData)
      console.log('ユーザー名', userData.name)
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

  const getDriverData = () => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('driverData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  };


  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('支払い処理を開始します...');
      // 支払い金額を設定（必要に応じて変更）
      const amount = 0.5; // 0.5 SOL の例

      // 管理側のアドレスを取得
      const agentAddress = '644upe4XFz1iWbbSGbRvqk6UcR7GFQDgJCVkVWjf9oF4';
      if (!agentAddress) {
        throw new Error("配送者のアドレスが見つかりません");
      }

      // 1. Solana の設定
      const SOLANA_RPC_URL = "https://api.testnet.solana.com";
      // 2. ファイルから秘密鍵を読み込む
      const SECRET_KEY_PATH = process.env.SECRET_KEY_PATH;
      if (!SECRET_KEY_PATH) {
        throw new Error('SECRET_KEY_PATH is not set in the environment variables');
      }
      const secretKeyString = fs.readFileSync(SECRET_KEY_PATH, 'utf8');
      const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
      // 3. Keypairオブジェクトを作成
      const payer = Keypair.fromSecretKey(secretKey);

      // これでpayerはローカルのSolanaウォレットのKeypairを使っています。
      console.log('Payer public key:', payer.publicKey.toString());
      const PROGRAM_ID = process.env.SOLANA_PROGRAM_ID;
      if (!PROGRAM_ID) {
        throw new Error('SOLANA_PROGRAM_ID is not set in the environment variables');
      }

      const connection = new Connection(SOLANA_RPC_URL, "confirmed");

      const recipientPublicKey = new PublicKey(agentAddress);
      const lamports = Math.floor(amount * 1e9); // SOLをlamportsに変換 (1 SOL = 1e9 lamports)

      // トランザクションの作成
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

      if (txInfo?.meta?.logMessages) {
        // ハッシュ値を生成
        // const hash = crypto.createHash('sha256').update(`${userId}-${signature}`).digest('hex');

        // フィールドの設定
        // const fields: [string, string][] = [
        //   ['userId', userId],
        //   ['transaction', signature],
        //   ['price', amount.toString()],
        // ];

        // TODO: localstrageに変更　（Redisにハッシュとして保存）
        // await redisService.connect();
        // await redisService.hSet(hash, fields);
        // await redisService.disconnect();

        // 成功時のレスポンス
        console.log('支払いが成功しました', signature);
      } else {
        console.error('Error:', 'トランザクションログの取得に失敗しました');
      }
    } catch (error) {
      console.error('Error:', error);
      console.error('Error:', (error as Error).message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <h2 className="text-xl font-bold flex-grow">Offer Confirm</h2>
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
          <img src={user.image || "/api/placeholder/40/40"} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="mb-4">
          <p className="font-semibold">{user.name || 'User'}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="bg-green-100 rounded-lg p-4 mb-6 flex items-center">
          <Check className="h-8 w-8 text-green-500 mr-3" />
          <p className="text-green-700 font-semibold">Your delivery request has been accepted!</p>
        </div>

        <div className="space-y-6 mb-6">
          <div>
            <h3 className="font-semibold flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Driver
            </h3>
            <p className="ml-7">{driverData.name}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-3 w-5 mr-2 text-red-500" />
              Pickup Location
            </h3>
            <p className="ml-7">{driverData.fromLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <MapPin className="h-3 w-5 mr-2 text-green-500" />
              Delivery Location
            </h3>
            <p className="ml-7">{driverData.toLocation}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <Clock className="h- w-5 mr-2 text-blue-500" />
              Preferred Time
            </h3>
            <p className="ml-7">{driverData.arrivalTime}</p>
          </div>
          <div>
            <h3 className="font-semibold flex items-center">
              <Package className="h-5 w-5 mr-2 text-purple-500" />
              Cargo Size
            </h3>
            <p className="ml-7">{driverData.cargoSpace}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-auto">
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              <Check className="h-5 w-5 mr-2" />
            )}
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaOfferAcceptedScreen;
