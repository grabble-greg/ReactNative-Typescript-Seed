import * as React from 'react';
import {NavigationScreenProps} from 'react-navigation';
import 'rxjs/add/observable/interval';
import {CounterModel} from '../models/counter-model';
import {CounterIntent} from '../intents/counter-intent';
import {CounterView} from '../views/counter-view';

interface HomeScreenNavigationParams { }
interface HomeScreenProps extends NavigationScreenProps<HomeScreenNavigationParams> {}

export class HomeScreen extends React.Component<HomeScreenProps> {
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
            <CounterView model={this.counterModel} ref="counterView" />
        );
    }
}
