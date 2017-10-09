import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {CounterState} from '../models/counter-model';
import {Subscription} from 'rxjs/Subscription';
import {Button, Text, View} from 'react-native';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';

interface CounterProps {
    updates: Observable<CounterState>;
}

export default class CounterView extends React.Component<CounterProps, CounterState> {
    private updateSubscription: Subscription;
    private incrementButtonSubject: Subject<void>;
    private decrementButtonSubject: Subject<void>;


    componentDidMount() {
        this.incrementButtonSubject = new Subject<void>();
        this.decrementButtonSubject = new Subject<void>();

        this.updateSubscription = this.props.updates
            .startWith({count: 0} as CounterState)
            .subscribe((state) => {
                this.setState(state);
            });
    }

    componentWillUnmount() {
        this.updateSubscription.unsubscribe();
    }

    get incrementButton(): Observable<void> {
        return this.incrementButtonSubject.asObservable();
    }

    get decrementButton(): Observable<void> {
        return this.decrementButtonSubject.asObservable();
    }

    render() {
        console.log(this.state);

        return (
            <View>
                <Text>Total: {this.state.count}</Text>

                <Button onPress={() => this.incrementButtonSubject.next()} title="Increment"/>
                <Button onPress={() => this.decrementButtonSubject.next()} title="Decrement"/>
            </View>
        );
    }
}
