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
import {Reducer} from '../util/model';
import {CounterIntent, CounterState} from './counter.component';

interface CounterSumState {
    changes: Array<number>;
    total: number;
}

interface CounterTableSources {
    count$: Observable<number>;
}

export class CounterTableComponent extends CycleComponent<CounterSumState, CounterTableSources> {

    protected readonly componentName = 'CounterTableComponent';

    main(sources: Sources<CounterSumState, CounterTableSources>): Sinks<CounterSumState> {
        const count$ = sources.state$
            .map((state) => (
                <View style={styles.container}>
                    {
                        state.changes.map((change, i) => <Text key={i}>{change}</Text>)
                    }

                    <Text>Total: {state.total}</Text>
                </View>
            ));

        const initialReducer$ = Observable.of(() => ({
            changes: [0],
            total: 0
        } as CounterSumState));

        // We're reducing state here instead of intents
        const reducer$: Observable<Reducer<CounterSumState>> = sources.given.count$
            .map((count: number) => (prev: CounterSumState) => ({
                changes: [...prev.changes, count],
                total: prev.total + count
            } as CounterSumState));

        return {
            DOM$: count$,
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
