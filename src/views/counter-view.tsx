import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {default as CounterModel, CounterState} from '../models/counter-model';
import {Subscription} from 'rxjs/Subscription';
import {Button, Text, View} from 'react-native';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/startWith';

export interface CounterViewProps {
    model: CounterModel;
}

export default class CounterView extends React.Component<CounterViewProps, CounterState> {
    private updateSubscription: Subscription;
    private incrementButtonSubject: Subject<void>;
    private decrementButtonSubject: Subject<void>;


    componentDidMount() {
        this.incrementButtonSubject = new Subject<void>();
        this.decrementButtonSubject = new Subject<void>();

        this.updateSubscription = this.props.model.updates
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

        if (!this.state) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>Total: {this.state.count}</Text>

                <Button onPress={() => this.incrementButtonSubject.next()} title="Increment"/>
                <Button onPress={() => this.decrementButtonSubject.next()} title="Decrement"/>
            </View>
        );
    }
}
