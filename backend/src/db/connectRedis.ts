import { createClient, RedisClientType } from "redis";

class RedisService {
  private client: RedisClientType;
  private isConnected: boolean = false;

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
    if (this.isConnected) {
      console.log('Socket already opened, reusing connection');
      return; // 既に接続されている場合は再接続しない
    }

    await this.client.connect();
    this.isConnected = true;
    console.log("Connected to Redis");
  }

  // Redis接続状態を確認するメソッド
  public checkConnection(): boolean {
    return this.isConnected;
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
    if (this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
      console.log("Disconnected from Redis");
    }
  }
}

export default RedisService;
