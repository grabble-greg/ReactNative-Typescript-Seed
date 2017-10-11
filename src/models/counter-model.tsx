import {CounterAction} from '../enums/counter-action';
import {Observable} from 'rxjs/Observable';
import {Model, StateReducer} from '../util/model';
import 'rxjs/add/observable/of';
import {CounterState} from '../states/counter-state';

//
/***
 * Our model layer. Takes in a stream of intents and returns a stream of reducer functions that get applied
 * to the state$ to transform it.
 */
export class CounterModel implements Model<CounterState, CounterAction> {

    public reduce(intent: Observable<CounterAction>): Observable<StateReducer<CounterState>> {
        const initialsReducer$ = Observable.of(() => ({current: 0} as CounterState));

        const countReducer$ = intent.map(
            (intent: CounterAction) => {
                switch (intent) {
                    case CounterAction.Increment:
                        return (prevState: CounterState) => ({current: prevState.current + 1} as CounterState);
                    case CounterAction.Decrement:
                        return (prevState: CounterState) => ({current: prevState.current - 1} as CounterState);
                    default:
                        throw new Error(`Unhandled counter intent: ${intent}`);
                }
            }
        );

        return Observable.merge(initialsReducer$, countReducer$);
    }
}
