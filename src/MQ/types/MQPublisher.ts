export default interface MQPublisher {
  publish(message: string | Object): void | Promise<void>;
  close(): void;
  connect(): Promise<void>;
}
