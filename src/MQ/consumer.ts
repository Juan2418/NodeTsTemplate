import MQSubscriber from './amqp_subscriber';
import * as dotenv from 'dotenv';

(async () => {
  dotenv.config();
  const subscriber = new MQSubscriber();
  await subscriber.connect();
  subscriber.subscribe((message) => {
    if (message) {
      subscriber.acknowledge(message);
      console.log(message.content.toString());
    }
  });
})();
