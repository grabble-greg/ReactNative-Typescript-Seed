import {Model, StateReducer} from './model';
import {Component} from './component';
import {Intent} from './intent';
import 'rxjs/add/operator/scan';

// Where we link everything up
export function cycle<TState, TEvent>(model: Model<TState, TEvent>,
                                      view: Component<TState, TEvent>,
                                      intent: Intent<Component<TState, TEvent>, TEvent>): void {

    // Our M(I(V)) output. It returns a stream of reducer functions that can be applied to the state
    const reducers$ = model.reduce(intent.observe(view));

    // Call each reducer when it comes, passing in the output of the previous reducer. We start with void to start
    // so that we trigger the first reducer
    const state$ = reducers$.scan((acc: TState, curr: StateReducer<TState>) => curr(acc), void 0 as (TState | undefined));
    view.subscribeTo(state$);
}
