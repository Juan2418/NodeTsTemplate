import AbstractPipeline from './AbstractPipeline';
import Queue from 'bull';

class QueuePipeline<FilterType extends { name: string; call: Function }, InputType> extends AbstractPipeline<
  FilterType,
  InputType
> {
  [x: string]: any;
  private initialized: boolean;
  private queues: Queue.Queue[];

  public constructor() {
    super();
    this.initialized = false;
    this.queues = [];
  }
  public override use(filter: FilterType) {
    this.queues.push(new Queue(filter.name));
    return super.use(filter);
  }
  public override run(input: InputType) {
    if (this.queues.length > 0) {
      if (!this.initialized) {
        for (let i = 0; i < this.queues.length; i++) {
          let queue = this.queues[i];
          let filter = this.filters[i];
          let next = this.queues.length !== i + 1 ? this.queues[i + 1] : null;
          queue.process((job: any, done: any) => {
            filter.call(this, job.data, (err: any, result: any) => {
              if (err) {
                this.emit('error', err);
                done(err);
              } else {
                if (next) {
                  next.add(result, { removeOnComplete: true });
                }
                done();
              }
            });
          });
          if (!next) {
            queue.on('completed', (job: any) => {
              this.emit('end', job.data);
            });
          }
        }
        this.initialized = true;
      }
      let queue = this.queues[0];
      queue.add(input, { removeOnComplete: true });
    }
  }
}

module.exports = QueuePipeline;
