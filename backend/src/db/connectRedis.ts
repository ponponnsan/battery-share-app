import { createClient } from "redis";

async function connectRedis() {
  // Redisクライアントを作成
  const client = createClient({
    url: "redis://localhost:6379",
  });

  // エラーハンドリング
  client.on("error", (err: Error) => {
    console.error("Redis error:", err);
  });

  try {
    // Redisサーバーに接続
    await client.connect();
    console.log("Connected to Redis");

    // Redisにデータをセット
    await client.set("key", "value");
    console.log('Set key "key" with value "value"');

    // Redisからデータを取得
    const value: string | null = await client.get("key");
    console.log('Get key "key":', value);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Redisクライアントを終了
    await client.quit();
  }
}

// 関数を呼び出し
connectRedis();
