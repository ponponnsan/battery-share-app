// import { Keypair, Connection } from '@solana/web3.js';
// import RedisService from '../db/connectRedis';
// import { Request, Response } from 'express'; // Using Express types for request/response

// const SOLANA_RPC_URL = "http://127.0.0.1:8899";
// const connection = new Connection(SOLANA_RPC_URL, "confirmed");
// const redisService = new RedisService();

// export default async function handler(req: Request, res: Response) {
//   // Connect to Redis
//   console.log("sssssssssssssss")
//   await redisService.connect();
//   console.log("aaaaaaaaaaaaaaaa")

//   try {
//     // Handle POST request for creating or reusing a Solana account
//     if (req.method === 'POST') {
//       const { userId } = req.body;
//       if (!userId) {
//         return res.status(400).json({ message: 'Missing user ID' });
//       }

//       // Check if Solana account already exists in Redis
//       let solanaAccount = await redisService.get(`solana-account:${userId}`);
//       let account: Keypair;

//       if (!solanaAccount) {
//         // Create a new Solana account
//         account = Keypair.generate();
//         await redisService.set(`solana-account:${userId}`, JSON.stringify(Array.from(account.secretKey)));
//         console.log('New Solana account created:', account.publicKey.toString());
//       } else {
//         // Reuse existing Solana account from Redis
//         const secretKey = Uint8Array.from(JSON.parse(solanaAccount));
//         account = Keypair.fromSecretKey(secretKey);
//         console.log('Existing Solana account found:', account.publicKey.toString());
//       }

//       // Respond with the Solana public key
//       return res.status(200).json({ publicKey: account.publicKey.toString() });

//     // Handle GET request for retrieving a Solana account
//     } else if (req.method === 'GET') {
//       const { userId } = req.query; // Assuming userId is passed as a query parameter
//       if (!userId) {
//         return res.status(400).json({ message: 'Missing user ID' });
//       }

//       // Retrieve the Solana account for the user
//       const solanaAccount = await redisService.get(`solana-account:${userId}`);
//       if (!solanaAccount) {
//         return res.status(404).json({ message: 'Solana account not found for this user' });
//       }

//       // Parse the account from Redis and respond with the public key
//       const secretKey = Uint8Array.from(JSON.parse(solanaAccount));
//       const account = Keypair.fromSecretKey(secretKey);
//       return res.status(200).json({ publicKey: account.publicKey.toString() });
//     } else {
//       return res.status(405).json({ message: 'Only POST and GET requests are allowed' });
//     }
//   } catch (error) {
//     console.error('Error handling Solana account:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   } finally {
//     // Disconnect from Redis
//     await redisService.disconnect();
//   }
// }

import { Keypair } from '@solana/web3.js';
import RedisService from '../db/connectRedis';
import { Request, Response } from 'express';

const redisService = new RedisService();

export default async function handler(req: Request, res: Response) {
  try {
    // Redisに接続
    await redisService.connect();

    // POSTリクエスト: Solanaアカウントの作成または確認
    if (req.method === 'POST') {
      const { userId } = req.body;

      // userIdが存在しない場合はエラーを返す
      if (!userId) {
        return res.status(400).json({ message: 'Missing user ID' });
      }

      // RedisでSolanaアカウントを確認
      let solanaAccount = await redisService.get(`solana-account:${userId}`);
      let account: Keypair;

      // Solanaアカウントがない場合、新しいアカウントを生成して保存
      if (!solanaAccount) {
        account = Keypair.generate();
        // SecretKeyをRedisに保存
        await redisService.set(`solana-account:${userId}`, JSON.stringify(Array.from(account.secretKey)));
        console.log('New Solana account created:', account.publicKey.toString());
      } else {
        // 既存のアカウントを再利用
        const secretKey = Uint8Array.from(JSON.parse(solanaAccount));
        account = Keypair.fromSecretKey(secretKey);
        console.log('Existing Solana account found:', account.publicKey.toString());
      }

      // SolanaアカウントのPublic Keyを返す
      return res.status(200).json({ publicKey: account.publicKey.toString() });

    // GETリクエスト: Solanaアカウントの確認
    } else if (req.method === 'GET') {
      const { userId } = req.query;

      // userIdが存在しない場合はエラーを返す
      if (!userId) {
        return res.status(400).json({ message: 'Missing user ID' });
      }

      // RedisからSolanaアカウントを取得
      const solanaAccount = await redisService.get(`solana-account:${userId}`);
      if (!solanaAccount) {
        return res.status(404).json({ message: 'Solana account not found for this user' });
      }

      // 既存のSolanaアカウントを取得し、Public Keyを返す
      const secretKey = Uint8Array.from(JSON.parse(solanaAccount));
      const account = Keypair.fromSecretKey(secretKey);
      return res.status(200).json({ publicKey: account.publicKey.toString() });

    // その他のHTTPメソッドは許可しない
    } else {
      return res.status(405).json({ message: 'Only POST and GET requests are allowed' });
    }
  } catch (error) {
    console.error('Error handling Solana account:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    // Redisとの接続を切断
    await redisService.disconnect();
  }
}