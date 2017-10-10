
import {Observable} from 'rxjs/Observable';
import {Intent} from '../intents/intent';

export interface Model<TState, TIntent extends Intent<any, any, any>>{
    readonly updates: Observable<TState>;
    observe(intent: TIntent): void;
}
