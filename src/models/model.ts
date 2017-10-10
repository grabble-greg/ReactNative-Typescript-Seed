import {Observable} from 'rxjs/Observable';

export type StateReducer<TState> = (prevState: TState) => TState;

// Interface defining the stream of event->reducer
export interface Model<TState, TEvent> {
    reduce(intent: Observable<TEvent>): Observable<StateReducer<TState>>;
}
