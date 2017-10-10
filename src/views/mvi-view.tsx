import * as React from 'react';
import {Model} from '../models/model';
import {Subscription} from 'rxjs/Subscription';

export interface Props<TState> {
    model: Model<TState, any>;
}

export abstract class MVIView<TState> extends React.Component<Props<TState>, TState> {
    private updateSubscription: Subscription;

    constructor(props?: Props<TState>, context?: any) {
        super(props, context);
    }

    componentDidMount() {
        this.updateSubscription = this.props.model.updates
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
