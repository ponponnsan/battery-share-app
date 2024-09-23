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

  // String型をセットするメソッド
  public async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
    console.log(`Set key "${key}" with value "${value}"`);
  }

  // String型を取得するメソッド
  public async get(key: string): Promise<string | null> {
    const value = await this.client.get(key);
    console.log(`Get key "${key}": ${value}`);
    return value ?? null;
  }

  // Hash型に複数のフィールドをセットするメソッド
  public async hSet(key: string, fields: [string, string][]): Promise<void> {
    const args: Record<string, string> = Object.fromEntries(fields);
    await this.client.hSet(key, args);
    console.log(`Set hash key "${key}" with fields: ${JSON.stringify(fields)}`);
  }

  // Hash型のデータを取得するメソッド
  public async hget(key: string, field: string): Promise<string | null> {
    const value = await this.client.hGet(key, field);
    console.log(`Get key "${key}" with field "${field}": ${value}`);
    return value ?? null;
  }

  // 接続を閉じるメソッド
  public async disconnect(): Promise<void> {
    await this.client.quit();
    console.log("Disconnected from Redis");
  }
}

export default RedisService;
