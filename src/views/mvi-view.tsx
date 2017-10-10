import * as React from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Model} from '../models/model';
import {Intent} from '../intents/intent';
import {cycle} from '../cycle';

// Base class for views. Handles setting up the cycle and subscribing to the state stream
export abstract class Component<TState, TEvent, TProps = {}> extends React.Component<TProps, TState> {
    private updateSubscription: Subscription;

    constructor(private model: Model<TState, TEvent>,
                private intent: Intent<Component<TState, TEvent>, TEvent>,
                props?: TProps, context?: any,) {
        super(props, context);
    }

    componentDidMount() {
        cycle<TState, TEvent>(this.model, this, this.intent);
    }

    subscribeTo(model$: Observable<TState>) {
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
