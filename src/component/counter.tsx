import * as React from 'react';
import {Observable} from 'rxjs/Observable';
import {CounterModel} from '../models/counter-model';
import {Button, Text, View} from 'react-native';
import {Subject} from 'rxjs/Subject';
import {CycleComponent} from '../util/component';
import {CounterAction} from '../enums/counter-action';
import {CounterIntent} from '../intents/counter-intent';
import {CounterState} from '../states/counter-state';
import {CounterList} from './counter-list';
import {CounterListState} from '../states/counter-list-state';


/*
 The view. Implements one function that returns the rendering of our state$
 Also expose any streams of events you want to raise intents from
*/

export class Counter extends CycleComponent<CounterState, CounterAction> {
    private counterList$: Observable<CounterListState>;
    private incrementButtonSubject: Subject<void> = new Subject<void>();
    private decrementButtonSubject: Subject<void> = new Subject<void>();

    componentDidMount() {
        const model = new CounterModel();
        const intent = new CounterIntent();
        this.cycle(model, intent);

        this.counterList$ = this.state$.scan((acc: CounterListState, curr: CounterState) => {
            acc.countLog.push(curr);
            return acc;
        }, {countLog: []} as CounterListState)
    }

    get incrementButton(): Observable<void> {
        return this.incrementButtonSubject.asObservable();
    }

    get decrementButton(): Observable<void> {
        return this.decrementButtonSubject.asObservable();
    }

    redraw(state: CounterState) {
        if (!state) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View>
                <Text>Total: {state.current}</Text>

                <Button onPress={() => this.incrementButtonSubject.next()} title="Increment"/>
                <Button onPress={() => this.decrementButtonSubject.next()} title="Decrement"/>

                <CounterList state$={this.counterList$}/>
            </View>
        );
    }
}
