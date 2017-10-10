import * as React from 'react';
import {NavigationScreenProps} from 'react-navigation';
import 'rxjs/add/observable/interval';
import {CounterModel, CounterState} from '../models/counter-model';
import {CounterIntent} from '../intents/counter-intent';
import {CounterView} from '../views/counter-view';
import {cycle} from '../cycle';
import {CounterAction} from '../enums/counter-action';

// These are so we can use navigation if we want to. these can be passed in to child views
// if needed
interface HomeScreenNavigationParams { }
interface HomeScreenProps extends NavigationScreenProps<HomeScreenNavigationParams> {}

// This is our "set-up" component. We need to be able to pass a full component to the navigation stuff
// We might be able to pass first-class MVI components in the future if we can figure out how to add the ref=... part
// when passing a navigation component in app.tsx
export class HomeScreen extends React.Component<HomeScreenProps> {
    private model: CounterModel;

    componentDidMount() {
        const view = this.refs['counterView'] as CounterView;
        const intent = new CounterIntent();
        this.model = new CounterModel();

        cycle<CounterState, CounterAction>(this.model, view, intent);
    }

    render() {
        return (
            <CounterView ref="counterView" />
        );
    }
}
