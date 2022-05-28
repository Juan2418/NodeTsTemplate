import amqp, { Message } from 'amqplib';
import { connect } from 'amqplib';

const mq_url = process.env.MQ_URL ?? 'amqp://localhost';

export default class MQSubscriber {
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

  public subscribe(callback: (message: Message | null) => void) {
    if (!this.channel) throw new Error('MQ channel not initialized');
    this.channel.consume(this.mq_queue, callback);
  }

  public acknowledge(message: Message) {
    if (!this.channel) throw new Error('MQ channel not initialized');
    this.channel.ack(message);
  }

  public close() {
    if (!this.connection) return;
    this.connection.close();
  }
}
