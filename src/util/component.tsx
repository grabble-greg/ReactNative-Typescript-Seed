import * as React from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Reducer} from './model';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import {Subject} from 'rxjs/Subject';


export type Sources<TState, TSources = {}> = TSources & {
    state$: Observable<TState>;
};

export type Sinks<TState, TSinks = {}> = TSinks & {
    reducer$: Observable<Reducer<TState>>;
    DOM$: Observable<JSX.Element>;
};

/***
 * Base class for components. Handles setting up the cycle and subscribing to the state$ stream
 *
 * @param {TState} The
 * @param {TEvent}
 * @param TProps extends ComponentProps<TState> = ComponentProps<TState>}
 */
export abstract class CycleComponent<TState,
    TSources = {},
    TSinks = {}>
    extends React.Component<TSources, JSX.Element> {

    private reducerSub: Subscription;
    private domSub: Subscription;

    protected abstract readonly componentName: string;

    componentDidMount() {
        // We have a chicken and egg problem here where we need to return an observable for the state stream
        // before we have been able to create it
        const reducer$ = new Subject<Reducer<TState>>();

        // HERE this needs to be hot!!!
        const state$ = reducer$.asObservable()
            .scan((acc: TState, curr: Reducer<TState>) => {
                    return curr(acc)
                }, void 0 as (TState | undefined)
            ).share();

        // TODO: Use spread operator after typescript 1.7 supports it
        const sources: any = {
            state$: state$
        };

        for (const prop in this.props) {
            if (!sources[prop]) {
                sources[prop] = this.props[prop];
            }
        }

        const sinks = this.main(sources);

        this.domSub = sinks.DOM$.subscribe(
            (elements: JSX.Element) => this.setState(elements)
        );

        if (sinks.reducer$) {
            this.reducerSub = sinks.reducer$.subscribe(
                (next) => reducer$.next(next),
                (error) => reducer$.error(error),
                () => reducer$.complete()
            );
        }
    }

    render() {
        return this.state;
    }

    componentWillUnmount() {
        this.reducerSub.unsubscribe();
        this.domSub.unsubscribe();
    }

    abstract main(sources: Sources<TState, TSources>): Sinks<TState, TSinks>;
}
