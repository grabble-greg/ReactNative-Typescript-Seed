import * as React from 'react';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

// Base class for views. Handles subscribing and unsubscribing to the state updates and making sure redraw gets called
export abstract class MVIView<TState> extends React.Component<{}, TState> {
    private updateSubscription: Subscription;

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
