export default interface MQSubscriber<Message> {
  subscribe(callback: (message: Message | null | any) => void): void;
  acknowledge(message: Message): void;
  close(): void;
  connect(): Promise<void>;
}
