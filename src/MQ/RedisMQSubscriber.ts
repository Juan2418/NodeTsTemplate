import redis, { RedisClientType } from 'redis';
import MQSubscriber from 'MQ/types/MQSubscriber';

export default class RedisMQSubscriber implements MQSubscriber<any> {
  private client: RedisClientType;
  private queue = process.env.MQ_QUEUE ?? 'default';

  public constructor(queueName?: string) {
    const redis_url = process.env.REDIS_URL;
    this.client = redis_url ? redis.createClient({ url: redis_url }) : redis.createClient();
    if (queueName) this.queue = queueName;
  }
  public async subscribe(callback: (message: any) => void): Promise<void> {
    this.client.subscribe(this.queue, callback);
  }
  public acknowledge(message: any): void {
    throw new Error('Method not implemented.');
  }
  public close(): void {
    this.client.quit();
  }
  public async connect(): Promise<void> {
    await this.client.connect();
  }
}
