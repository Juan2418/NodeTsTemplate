import { Request, Response } from 'express';
import MQPublisher from '../MQ/amqp_publisher';
import MQSubscriber from '../MQ/amqp_subscriber';

export const getHelloWorld = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

export const postHelloWorld = async (req: Request, res: Response) => {
  const publisher = new MQPublisher();
  await publisher.connect();
  publisher.publish(req.body.message);
  res.send('message sent');
};

export const consume = async (req: Request, res: Response) => {
  const subscriber = new MQSubscriber();
  try {
    await subscriber.connect();
    subscriber.subscribe((message) => {
      if (message) {
        subscriber.acknowledge(message);
        res.send(message.content.toString());
        return;
      }

      res.send('no message');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  } finally {
    subscriber.close();
  }
};

export default { getHelloWorld };
