import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as fs from 'fs';
import RedisService from './src/db/connectRedis';
import handler from './src/route/solana';


dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://127.0.0.1:3000', // フロントエンドのURL
  credentials: true
}));
app.use(express.json()); // リクエストボディをJSONで受け取るため

// RedisServiceのインスタンスを作成
const redisService = new RedisService();

// 1. Solana の設定
const SOLANA_RPC_URL = "http://127.0.0.1:8899";
//const SOLANA_RPC_URL_TEST = "https://api.testnet.solana.com"; // Testnet
// 2. ファイルから秘密鍵を読み込む
const SECRET_KEY_PATH = process.env.SECRET_KEY_PATH;
if (!SECRET_KEY_PATH) {
  throw new Error('SECRET_KEY_PATH is not set in the environment variables');
}
const secretKeyString = fs.readFileSync(SECRET_KEY_PATH, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));

// 3. Keypairオブジェクトを作成
const payer = Keypair.fromSecretKey(secretKey);

// TODO: 管理側のアドレスを設定
const agentAddress = '3TMk4asz5EA5RS781apWGBABVvLFKXAUqVUiumDnBQ66';

// これでpayerはローカルのSolanaウォレットのKeypairを使っています。
console.log('Payer public key:', payer.publicKey.toString());
const PROGRAM_ID = process.env.SOLANA_PROGRAM_ID;
if (!PROGRAM_ID) {
  throw new Error('SOLANA_PROGRAM_ID is not set in the environment variables');
}

const connection = new Connection(SOLANA_RPC_URL, "confirmed");

// solana accout 作成
/**
 * Usage:
 * curl -X POST http://localhost:3001/api/solana/setup \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "exampleUserId123"     
  }'
 */
app.post('/api/solana/setup', handler);

// solana account 呼び出し
/**
 * Usage:
 * curl -X GET 'http://localhost:3001/api/solana/setup?userId=your-user-id'
 */
app.get('/api/solana/setup', handler); 

// 管理側への支払いAPI
/**
 * Usage:
 * curl -X POST -H "Content-Type: application/json" -d '{ "amount": 0.5 }' http://localhost:3001/send-to-agent
 */
app.post('/send-to-agent', async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: "金額が必要です" });
    }

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
      res.status(400).json({ success: false, message: "トランザクションが失敗しました", error: confirmation.value.err });
      return;
    }

    // トランザクションの詳細を取得
    const txInfo = await connection.getTransaction(signature, { commitment: "confirmed" });

    if (txInfo?.meta?.logMessages) {
      res.json({ success: true, message: "支払いが成功しました", transactionId: signature });
    } else {
      res.status(500).json({ success: false, message: "トランザクションログの取得に失敗しました" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "サーバーエラーが発生しました", error: (error as Error).message });
  }
});

// 配送者への支払いAPI
/**
 * Usage:
 * curl -X POST -H "Content-Type: application/json" -d '{ "address": "3TMk4asz5EA5RS781apWGBABVvLFKXAUqVUiumDnBQ66", "amount": 0.5 }' http://localhost:3001/send-to-carrier
 */
app.post('/send-to-carrier', async (req: Request, res: Response) => {
  try {
    const { address, amount } = req.body;

    if (!address || !amount) {
      return res.status(400).json({ success: false, message: "受信者アドレスと金額が必要です" });
    }

    // 受信者のアドレスが有効かどうかを確認
    let recipientPublicKey: PublicKey;
    try {
      recipientPublicKey = new PublicKey(address);
    } catch (error) {
      return res.status(400).json({ success: false, message: "無効な受信者アドレスです" });
    }

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
      res.status(400).json({ success: false, message: "トランザクションが失敗しました", error: confirmation.value.err });
      return;
    }

    // トランザクションの詳細を取得
    const txInfo = await connection.getTransaction(signature, { commitment: "confirmed" });

    if (txInfo?.meta?.logMessages) {
      res.json({ success: true, message: "支払いが成功しました", transactionId: signature });
    } else {
      res.status(500).json({ success: false, message: "トランザクションログの取得に失敗しました" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "サーバーエラーが発生しました", error: (error as Error).message });
  }
});

// Redisにデータをセット
/**
 * Usage:
 * curl -X POST -H "Content-Type: application/json" -d '{"key": "exampleKey", "value": "exampleValue"}' http://localhost:3001/set-redis
 */
app.post('/set-redis', async (req: Request, res: Response) => {
  try {
    // リクエストからデータを取得
    const { key, value } = req.body;

    // keyとvalueが提供されていない場合のエラーハンドリング
    if (!key || !value) {
      return res.status(400).json({ success: false, message: 'キーと値の両方が必要です' });
    }

    // Redisに接続してデータをセット
    await redisService.connect();
    await redisService.set(key, value);

    // 成功時のレスポンス
    res.status(200).json({ success: true, message: `キー "${key}" に値 "${value}" を保存しました` });

    // Redisから切断
    await redisService.disconnect();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'サーバーエラーが発生しました', error: (error as Error).message });
  }
});

// Redisからデータを取得
/**
 * Usage:
 * curl -X GET "http://localhost:3001/get-redis?key=exampleKey"
 */
app.get('/get-redis', async (req: Request, res: Response) => {
  try {
    const { key } = req.query;

    if (!key) {
      return res.status(400).json({ success: false, message: 'キーが必要です' });
    }

    await redisService.connect();
    const value = await redisService.get(key as string);

    if (value) {
      res.status(200).json({ success: true, key, value });
    } else {
      res.status(404).json({ success: false, message: `キー "${key}" に対応するデータが見つかりませんでした` });
    }

    await redisService.disconnect();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'サーバーエラーが発生しました', error: (error as Error).message });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
