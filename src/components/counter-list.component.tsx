import * as React from 'react';
import {ListView, ListViewDataSource, Text} from 'react-native';
import {CycleComponent} from '../util/component';
import {CounterListState} from '../states/counter-list.state';

/***
 * A very simple components that just lists data. Takes its state from this.props.state$
 */
export class CounterList extends CycleComponent<CounterListState> {
    private dataSource: ListViewDataSource;

    componentDidMount() {
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const state$ = this.props.state$;

        this.subscribeTo(state$);
    }

    redraw(state: CounterListState) {
        if (!state) {
            return null;
        }

        const data = this.dataSource.cloneWithRows(
            state.countLog.map((countState) => countState.current.toString())
        );
        return (
            <ListView dataSource={data}
                      renderRow={(rowData: string) => <Text>{rowData}</Text>}/>
        );
    }
}
