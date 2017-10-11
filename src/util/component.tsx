import * as React from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Model, StateReducer} from './model';
import {Intent} from './intent';
import 'rxjs/add/operator/scan';

export interface ComponentProps<TState> {
    state$: Observable<TState>;
}

/***
 * Base class for component. Handles setting up the cycle and subscribing to the state$ stream
 *
 * @param {TState} The
 * @param {TEvent}
 * @param TProps extends ComponentProps<TState> = ComponentProps<TState>}
 */
export abstract class CycleComponent<TState, TEvent = {}, TProps extends ComponentProps<TState> = ComponentProps<TState>> extends React.Component<TProps, TState> {
    private updateSubscription: Subscription;
    protected state$: Observable<TState>;

    protected cycle(model: Model<TState, TEvent>,
                    intent: Intent<CycleComponent<TState, TEvent>, TEvent> | undefined): void {

        if (intent) {
            // Our M(I(V)) output. It returns a stream of reducer functions that can be applied to the state$
            const reducers$ = model.reduce(intent.observe(this));

            // Call each reducer when it comes, passing in the output of the previous reducer. We start with void to start
            // so that we trigger the first reducer
            const state$ = reducers$.scan((acc: TState, curr: StateReducer<TState>) => curr(acc), void 0 as (TState | undefined));
            this.subscribeTo(state$);
        }

    }

    protected subscribeTo(model$: Observable<TState>) {
        this.state$ = model$;
        this.updateSubscription = model$
            .subscribe((state) => {
                this.setState(state);
            });
    }

    componentWillUnmount() {
        this.updateSubscription.unsubscribe();
    }

    render() {
        return this.redraw(this.state);
    }

    abstract redraw(state: TState): JSX.Element | null | false;
}
