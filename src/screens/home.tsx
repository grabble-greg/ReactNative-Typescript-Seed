import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Subject} from 'rxjs/Subject';
import CounterModel from '../models/counter-model';
import CounterIntent from '../intents/counter-intent';
import CounterView from '../views/counter-view';

interface HomeScreenNavigationParams { }
interface HomeScreenProps extends NavigationScreenProps<HomeScreenNavigationParams> {}

export default class HomeScreen extends React.Component<HomeScreenProps> {
    private counterModel: CounterModel;
    private counterIntent: CounterIntent;

    constructor(props?: HomeScreenProps, context?: any) {
        super(props, context);

        this.counterIntent = new CounterIntent();
        this.counterModel = new CounterModel();
    }

    componentDidMount() {
        this.counterIntent.observe(this.refs['counterView'] as CounterView);
        this.counterModel.observe(this.counterIntent);
    }

    render() {
        const state = this.state || {count: 0};
        const { navigate } = this.props.navigation;

        return (
            <CounterView updates={this.counterModel.updates} ref="counterView" />
        );
    }
}
