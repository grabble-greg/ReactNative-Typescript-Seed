import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {CycleComponent, Sinks, Sources} from '../util/component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import {Button, Text} from 'react-native-elements';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {CounterTableComponent} from './counter-table.component';

export interface CounterState {
    amount: number;
}

export enum CounterIntent {
    Increment,
    Decrement
};

export class CounterComponent extends CycleComponent<CounterState> {

    main(sources: Sources<CounterState>): Sinks<CounterState> {
        const intentSub = new Subject<CounterIntent>();

        const vdom$ = sources.state$
            .map((state) => (
                <View style={styles.container}>
                    <Text>{state.amount}</Text>
                    <Button title="Increment" onPress={() => intentSub.next(CounterIntent.Increment)} />
                    <Button title="Decrement" onPress={() => intentSub.next(CounterIntent.Decrement)} />

                    <CounterTableComponent count$={sources.state$.map(s => s.amount)}></CounterTableComponent>
                </View>
            ));

        const initialReducer$ = Observable.of(() => ({
            amount: 0
        } as CounterState));

        const reducer$ = intentSub.asObservable()
            .map(intent => {
                switch (intent) {
                    case CounterIntent.Increment:
                        return (prevState: CounterState) => ({amount: prevState.amount + 1} as CounterState);
                    case CounterIntent.Decrement:
                        return (prevState: CounterState) => ({amount: prevState.amount - 1} as CounterState);
                }
            });

        return {
            DOM$: vdom$,
            reducer$: Observable.merge(initialReducer$, reducer$)
        };
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
