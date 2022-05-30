import EventEmitter from 'events';
import Util from 'util';

export default abstract class AbstractPipeline<FilterType, InputType> {
  protected filters: FilterType[];

  public constructor() {
    this.filters = [];
    EventEmitter.call(this as any);
    Util.inherits(AbstractPipeline, EventEmitter);
  }

  public use(filter: FilterType) {
    this.filters.push(filter);
    return this;
  }
  public abstract run(input: InputType): void;
}
