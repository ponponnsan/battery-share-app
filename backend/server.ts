import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // リクエストボディをJSONで受け取るため

// 1. Solana の設定
const SOLANA_RPC_URL = "http://127.0.0.1:8899";
const secretKeyPath = "/Users/suhara_yuka/.config/solana/id.json";
//const SOLANA_RPC_URL_TEST = "https://api.testnet.solana.com"; // Testnet
// 2. ファイルから秘密鍵を読み込む
const secretKeyString = fs.readFileSync(secretKeyPath, 'utf8');
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

app.get('/invoke-program', async (_req: Request, res: Response) => {
  try {
    const programId = new PublicKey(PROGRAM_ID);

    const transaction = new Transaction().add(
      new TransactionInstruction({
        keys: [],
        programId,
        data: Buffer.alloc(0), // 空のデータ
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
      res.json({ success: true, message: txInfo.meta.logMessages.join('\n') });
    } else {
      res.status(500).json({ success: false, message: "トランザクションログの取得に失敗しました" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "サーバーエラーが発生しました", error: (error as Error).message });
  }
});

// 管理側への支払いAPI
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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
