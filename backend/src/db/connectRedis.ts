import { createClient, RedisClientType } from "redis";

class RedisService {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: "redis://localhost:6379", // RedisのURL
    });

    this.client.on("error", (err: Error) => {
      console.error("Redis error:", err);
    });
  }

  // Redisとの接続を開始するメソッド
  public async connect(): Promise<void> {
    await this.client.connect();
    console.log("Connected to Redis");
  }

  // データをセットするメソッド
  public async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
    console.log(`Set key "${key}" with value "${value}"`);
  }

  // データを取得するメソッド
  public async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    console.log(`Get key "${key}": ${value}`);
    return value;
  }

  // 接続を閉じるメソッド
  public async disconnect(): Promise<void> {
    await this.client.quit();
    console.log("Disconnected from Redis");
  }
}

export default RedisService;
