import * as React from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import {Subject} from 'rxjs/Subject';

export type Reducer<TState> = (prev: TState) => TState;

export interface Sources<TState> {
    state$: Observable<TState>;
};

export interface Sinks<TState> {
    reducer$: Observable<Reducer<TState>>;
    DOM$: Observable<ReactElements>;
};

type ReactElements = JSX.Element | JSX.Element[] | React.ReactPortal | string | number | null | false;

/***
 * Base class for components. Handles setting up the cycle and subscribing to the state$ stream
 *
 * @param {TState} The
 * @param {TEvent}
 * @param TProps extends ComponentProps<TState> = ComponentProps<TState>}
 */
export abstract class CycleComponent<TState, TProps = {}>
    extends React.Component<TProps, ReactElements> {

    private reducerSub: Subscription;
    private domSub: Subscription;

    componentDidMount() {
        // We have a chicken and egg problem here where we need to return an observable for the state stream
        // before we have been able to create it
        const reducer$ = new Subject<Reducer<TState>>();

        const state$ = reducer$.asObservable()
            .scan((acc: TState, curr: Reducer<TState>) => {
                    return curr(acc)
                }, void 0 as (TState | undefined)
            ).share();

        const sources: Sources<TState> = {
            state$: state$
        };

        const sinks = this.main(sources);

        this.domSub = sinks.DOM$.subscribe(
            (elements: ReactElements) => this.setState(elements)
        );

        if (sinks.reducer$) {
            this.reducerSub = sinks.reducer$.subscribe(
                (next) => reducer$.next(next),
                (error) => reducer$.error(error),
                () => reducer$.complete()
            );
        }
    }

    render(): ReactElements {
        return this.state as any; // Nasty hack as React marks state as Readonly<S> which we can't unwrap
    }

    componentWillUnmount() {
        this.reducerSub.unsubscribe();
        this.domSub.unsubscribe();
    }

    abstract main(sources: Sources<TState>): Sinks<TState>;
}
