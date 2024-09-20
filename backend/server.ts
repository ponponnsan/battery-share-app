import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as fs from 'fs';

dotenv.config();

const app = express();
app.use(cors());

// Solana の設定
const SOLANA_RPC_URL = "http://127.0.0.1:8899";
const secretKeyPath = "/Users/suhara_yuka/.config/solana/id.json";
// 2. ファイルから秘密鍵を読み込む
const secretKeyString = fs.readFileSync(secretKeyPath, 'utf8');
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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));