import * as Rx from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

export type Reducer<TState, TAction> = (prev: TState, action: Action<TAction>) => TState;

// Force you to use a type for your action (i.e. an enum)
export interface Action<TAction> {
    type: TAction;
}

export type AsyncAction<TAction> = () => Rx.Observable<Action<TAction>>;

export function combinedReducers<TState, TAction>(mapping: {[K in keyof TState]: Reducer<TState[K], TAction>}): Reducer<TState, TAction> {
    return (state: TState, action: Action<TAction>) => {
        const newState = {} as TState;

        for (const key in mapping) {
            newState[key] = mapping[key](state[key], action);
        }

        return newState;
    };
};

export class Store<TState, TAction> {
    private _action$ = new Rx.ReplaySubject<Action<TAction>>();
    private _state$ = new Rx.ReplaySubject<TState>(1);
    private _sub: Subscription;

    constructor(_reducer: Reducer<TState, TAction>, initialState: TState | undefined = undefined) {
        this._sub = this._action$.asObservable()
            .scan(_reducer, initialState)
            .subscribe(
                (state) => this._state$.next(state),
                error => this._state$.error(error)
            );
    }

    dispatch(action: Action<TAction> | AsyncAction<TAction>) {
        if (typeof action === 'function') {
            // Async action
            const observable$ = action();
            if (!(observable$ instanceof Rx.Observable)) {
                throw new Error(`Action function did not return an observable, returned ${typeof observable$}`);
            }
            observable$.subscribe(x => this._action$.next(x));

        } else {
            this._action$.next(action);
        }
    }

    getState$(): Rx.Observable<TState> {
        return this._state$.asObservable();
    }
}
