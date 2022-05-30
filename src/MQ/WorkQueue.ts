import RabbitMQPublisher from 'MQ/amqp_publisher';
import { Message } from 'amqplib';
import EventEmitter from 'events';
import Util from 'util';

export default class WorkQueue extends RabbitMQPublisher {
  [x: string]: any;
  public constructor(queueName: string) {
    super();
    this.mq_queue = queueName;
    EventEmitter.call(this as any);
    Util.inherits(WorkQueue, EventEmitter);
  }

  public async process(handler: (message: string) => Promise<any>) {
    await this.connect();

    if (!this.channel) throw new Error('MQ channel not initialized');
    this.channel.consume(this.mq_queue, async (msg: Message | null) => {
      if (!msg) return;
      try {
        const output = await handler(msg.content.toString());
        this.acknowledge(msg);
        this.emit('done', output);
        this.close();
      } catch (err) {
        this.emit('error', err);
      }
    });
  }

  public acknowledge(message: Message) {
    if (!this.channel) throw new Error('MQ channel not initialized');
    this.channel.ack(message);
  }
}
