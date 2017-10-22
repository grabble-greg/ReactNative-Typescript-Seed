import {Observable} from 'rxjs/Observable';

export type Reducer<TState> = (prevState: TState) => TState;

// Interface defining the stream of event->reducer
export interface Model<TState, TEvent> {
    bind(intent: Observable<TEvent>): Observable<Reducer<TState>>;
}
