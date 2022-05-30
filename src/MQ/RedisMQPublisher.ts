import redis from 'redis';
import { RedisClientType } from '@redis/client';
import MQPublisher from 'MQ/types/MQPublisher';

export default class RedisMQPublisher implements MQPublisher {
  private client: RedisClientType;
  private queue = process.env.MQ_QUEUE ?? 'default';

  public constructor(queueName?: string) {
    const redis_url = process.env.REDIS_URL;
    this.client = redis_url ? redis.createClient({ url: redis_url }) : redis.createClient();
    if (queueName) this.queue = queueName;
  }

  public async publish(message: Object): Promise<void> {
    this.client.publish(this.queue, JSON.stringify(message));
  }
  close(): void {
    this.client.quit();
  }
  public async connect(): Promise<void> {
    await this.client.connect();
  }
}
