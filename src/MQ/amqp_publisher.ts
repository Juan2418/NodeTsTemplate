import amqp from 'amqplib';
import { connect } from 'amqplib';

const mq_url = process.env.MQ_URL ?? 'amqp://localhost';

export default class MQPublisher {
  private connection: amqp.Connection | undefined;
  private channel: amqp.Channel | undefined;

  private mq_url = process.env.MQ_URL ?? 'amqp://localhost';
  private mq_queue = process.env.MQ_QUEUE ?? 'default';

  constructor() {}

  public async connect() {
    this.connection = await connect(this.mq_url);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.mq_queue);
  }

  public publish(message: string) {
    if (!this.channel) throw new Error('MQ channel not initialized');
    this.channel.sendToQueue(this.mq_queue, Buffer.from(message));
  }

  public close() {
    if (!this.connection) return;
    this.connection.close();
  }
}
